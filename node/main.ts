const stocks = require('./stocks');
const http = require('http')
const request = require('./request')
const fs = require('fs');

const webLoc = './../web';
const PORT = 80;

const server = http.createServer();
server.on('request', (req, res)=>{
	var path: str = req.url ?? '/';
	var url: URL = new URL(path, req.headers.host);
	var method: str = req.method;
	var body: str = '';
	var code: int = 200;
	var msg: str = request.Status[200];
	var type: str = 'text/html';
	if (path.endsWith('.html')) {
		try{
				body = fs.readFileSync(`${webLoc}/html${path}`, 'utf-8');
		} catch(e) {
			code = 404;
			msg = request.Status[404];
		}
	}
	else if (path.endsWith('.js')) {
		try {
			body = fs.readFileSync(`${webLoc}/js${path}`, 'utf-8');
			type = 'text/javascript';
		} catch(e) {
			code = 404;
			msg = request.Status[404];
		}
	}
	else if (path.endsWith('.css')) {
		try {
			body = fs.readFileSync(`${webLoc}/css${path}`, 'utf-8');
			type = 'text/css';
		} catch(e) {
			code = 404;
			msg = request.Status[404];
		}
	}
	if (path == '/') {
		body = fs.readFileSync(`${webLoc}/html/index.html`, 'utf-8');
	}
	else if (path == '/picks' || path == '/stockpicks') {
		body = fs.readFileSync(`${webLoc}/html/stockpicks.html`, 'utf-8');
	}
	
	res.writeHead(code, msg, {
			'Content-Length':Buffer.byteLength(body),
			'Content-Type': `text/${type}`
	})
	res.write(body);
	res.end();
});
server.listen(PORT)