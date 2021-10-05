import * as stocks from './stocks';
import * as http from 'http';
import * as request from './request';
import * as fs from 'fs';
const webDir = './../web';
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
		try {
			var dir = `${webDir}/html${path}`;
			body = fs.readFileSync(dir, 'utf-8');
			type = 'text/html';
		} catch(err) {
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path.endsWith('.js')) {
		try {
			var dir = `${webDir}/js${path}`;
			body = fs.readFileSync(dir, 'utf-8');
			type = 'text/javascript';
		} catch(err) {
			code = 404;
			status = request.Status[404];
		}
	}
	else if (path.endsWith('.css')) {
		try {
			var dir = `${webDir}/css${path}`;
			body = fs.readFileSync(dir, 'utf-8');
			type = 'text/css';
		} catch(err) {
			code = 404;
			status = request.Status[404];
		}
	}
	if (path == '/') {
		body = fs.readFileSync(`${webDir}/html/index.html`, 'utf-8');
	}
	else if (path == '/picks' || path == '/stockpicks') {
		body = fs.readFileSync(`${webDir}/html/stockpicks.html`, 'utf-8');
	}
	else {
		code = 404;
		status = request.Status[404];
	}
	body += '\n';
	var msg = `${code} ${status}`;
	res.writeHead(code, msg, {
			'Content-Length':Buffer.byteLength(body),
			'Content-Type': `${type}`
	})
	res.write(body);
	res.end();
});
server.listen(PORT)