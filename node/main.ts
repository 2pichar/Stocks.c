import * as stocks from './stocks';
import * as http from 'https';
import * as request from './request';
import * as fs from 'fs';
const webLoc = './../web';
const PORT = 3000;

const server = http.createServer();
server.on('request', (req, res)=>{
	console.log(req);
	var path: str = req.url ?? '/';
	let url: URL;
	try {
		url = new URL(path, req.headers.host);
	} catch(err) {}
	var method: str = req.method;
	var body: str = '';
	var code: int = 200;
	var status: str = request.Status[code];
	var type: str = 'text/html';
	if (path.endsWith('.html')) {
		try{
				body = fs.readFileSync(`${webLoc}/html${path}`, 'utf-8');
		} catch(e) {
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path.endsWith('.js')) {
		try {
			body = fs.readFileSync(`${webLoc}/js${path}`, 'utf-8');
			type = 'text/javascript';
		} catch(e) {
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path.endsWith('.css')) {
		try {
			body = fs.readFileSync(`${webLoc}/css${path}`, 'utf-8');
			type = 'text/css';
		} catch(e) {
			code = 404;
			status = request.Status[404];
		}
	}
	if (path == '/') {
		body = fs.readFileSync(`${webLoc}/html/index.html`, 'utf-8');
	}
	else if (path == '/picks' || path == '/stockpicks') {
		body = fs.readFileSync(`${webLoc}/html/stockpicks.html`, 'utf-8');
	}
	else {
		code = 404;
		status = request.Status[404];
	}
	var msg = `${code} ${status}`;
	res.writeHead(code, msg, {
			'Content-Length':Buffer.byteLength(body),
			'Content-Type': `${type}`
	})
	res.write(body);
	res.end();
});
server.listen(/*PORT*/)