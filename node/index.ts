import * as stocks from './stocks';
import * as http from 'http';
import * as request from './request';
import * as fs from 'fs';
import * as sql from 'better-sqlite3'
const web = './../web';
const PORT = 3000;

const server = http.createServer()
.on('request', async (req, res)=>{
	await request.getBody(req);
	req.on('error', (err)=>{
		console.error(err.message);
		code = 400;
	});
	console.log(req);
	var path: str = req.url ?? '/';
	let url: URL = new URL(path, req.headers.host);
	var method: str = req.method;
	var body: str = req.body;
	var data: str = '';
	var code: int = 200;
	var type: str = 'text/html';
	if(method == 'GET'){
		if (path.endsWith('.html')) {
			try {
				var dir = `${web}/html${path}`;
				data = fs.readFileSync(dir, 'utf-8');
				type = 'text/html';
			} catch(err) {
				console.error(err);
				code = 404;
			}
		}
		else if (path.endsWith('.js')) {
			try {
				var dir = `${web}/js${path}`;
				data = fs.readFileSync(dir, 'utf-8');
				type = 'text/javascript';
			} catch(err) {
				console.error(err);
				code = 404;
			}
		}
		else if (path.endsWith('.css')) {
			try {
				var dir = `${web}/css${path}`;
				data = fs.readFileSync(dir, 'utf-8');
				type = 'text/css';
			} catch(err) {
				console.error(err);
				code = 404;
			}
		}
		else if (path == '/') {
			data = fs.readFileSync(`${web}/html/index.html`, 'utf-8');
		}
		else if (path == '/picks' || path == '/stockpicks') {
			data = fs.readFileSync(`${web}/html/stockpicks.html`, 'utf-8');
		}
		else if (path == '/stocks'){
			data = JSON.stringify(await stocks.analyze(await stocks.getStocks('all')));
		type = 'text/json';
		}
		else {
			code = 404;
		}
	}
	else if (method == 'POST'){
		if (path == '/login') {

		}
		else if ((['/picks', '/stockpicks', '/stocks', '/']).includes(path)){
			code = 405
		}
		else if (path.endsWith('.css') || path.endsWith('.html') || path.endsWith('.js')){
			code = 405
		}
		else {
			code = 404;
		}
	}
	else {
		code = 501;
	}
	var status: str = request.Status[code];
	data += '\n';
	var msg = `${code} ${status}`;
	res.writeHead(code, msg, {
			'Content-Length':Buffer.byteLength(data),
			'Content-Type': `${type}`
	})
	res.write(data);
	res.end();
})
.listen(PORT);