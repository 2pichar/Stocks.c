import * as stocks from './stocks';
import * as http from 'http';
import * as request from './request';
import * as fs from 'fs';
const webDir = './../web';
const PORT = 3000;

const server = http.createServer()
.on('request', async (req, res)=>{
	await request.getBody(req);
	console.log(req);
	var path: str = req.url ?? '/';
	let url: URL;
	try {
		url = new URL(path, req.headers.host);
	} catch(err) {}
	var method: str = req.method;
	var body: str = req.body;
	var data: str = '';
	var code: int = 200;
	var status: str = request.Status[code];
	var type: str = 'text/html';
	if (path.endsWith('.html')) {
		try {
			var dir = `${webDir}/html${path}`;
			data = fs.readFileSync(dir, 'utf-8');
			type = 'text/html';
		} catch(err) {
			console.error(err);
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path.endsWith('.js')) {
		try {
			var dir = `${webDir}/js${path}`;
			data = fs.readFileSync(dir, 'utf-8');
			type = 'text/javascript';
		} catch(err) {
			console.error(err);
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path.endsWith('.css')) {
		try {
			var dir = `${webDir}/css${path}`;
			data = fs.readFileSync(dir, 'utf-8');
			type = 'text/css';
		} catch(err) {
			console.error(err);
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path == '/') {
		data = fs.readFileSync(`${webDir}/html/index.html`, 'utf-8');
	}
	else if (path == '/picks' || path == '/stockpicks') {
		data = fs.readFileSync(`${webDir}/html/stockpicks.html`, 'utf-8');
	}
	else if(path == '/stocks' && method == 'GET'){
		data = JSON.stringify(await stocks.analyze(await stocks.getStocks('all')));
		type = 'text/json';
	}
	else {
		code = 404;
		status = request.Status[404];
	}
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