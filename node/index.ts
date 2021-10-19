import * as stocks from './stocks';
import * as http from 'http';
import * as request from './request';
import * as fs from 'fs';
import * as sql from 'better-sqlite3'

const loginDB: sql.Database = new sql(__dirname+'/main.db');
const web = __dirname+'/../web';
const PORT = 3000;

const storage_json = fs.open('./storage.json', 'rw');
const vars = JSON.parse(storage_json.readFileSync());
var lastSessionID = vars['lastSessionID'];

// SQL Queries
const login: sql.Statement = loginDB.prepare('SELECT * from logins where username = $user and password = $pass');

var headers = {};

const server = http.createServer()
.on('request', async (req, res)=>{
	await request.getBody(req);
	req.on('error', (err)=>{
		console.error(err.message);
		code = 400;
	});
	console.log(req);
	var path: str = req.url ?? '/';
	let url: URL = new URL(path, `http://${req.headers.host}`);
	var method: str = req.method;
	var data: str = '';
	var code: int = 200;
	var type: str = 'text/html';
	var file = '';
	if(method == 'GET'){
		if (path.endsWith('.html')) {
			file = `/html${path}`;
			type = 'text/html';
		}
		else if (path.endsWith('.js')) {
			file = `/js${path}`;
			type = 'text/javascript';
		}
		else if (path.endsWith('.css')) {
			file = `/css${path}`;
			type = 'text/css';
		}
		else if (path == '/') {
			file = '/html/index.html';
		}
		else if (path == '/picks' || path == '/stockpicks') {
			file = '/html/stockpicks.html';
		}
		else if (path == '/stocks'){
			data = JSON.stringify(await stocks.analyze(await stocks.getStocks('all')));
			type = 'text/json';
		}
		else if (path == '/login'){
			file = '/html/login.html'
		}
		else {
			code = 404;
		}
	}
	else if (method == 'POST'){
		if (path == '/login') {
			let username: str;
			let password: str;
			if ('username' in req.body){
				username = req.body.username;
                if('password' in req.body){
				    password = req.body.password;
			        let res: loginEntry = login.get({user: username, pass: password});
                    if( res == undefined ){ // Invalid Username/Password
                        
                    } else { // Valid Username/Password
                        code = 200;
                        var sessionID = lastSessionID++;
                        headers['Set-Cookie'] = `session=${username}:${password}; sessionID=${sessionID}`;
                        var summ = {};
                    }
			    } else {code = 400;}
			} else {code = 400;}
			
			console.log(res);
			console.log(path);
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
	if(method == 'GET' && !data && (['html', 'css', 'javascript']).includes(type.split('/')[1]) && code != 404){
		try{
			let loc = `${web}${file}`;
			data = fs.readFileSync(loc, 'utf-8');
		} catch (err){
			console.error(err);
			code = 404;
		}
	}
	var status: str = request.Status[code];
	data += '\n';
	var msg = `${code} ${status}`;
	res.writeHead(code, msg, {
			'Content-Length':Buffer.byteLength(data),
			'Content-Type': `${type}`,
            ...headers
	})
	res.write(data);
	res.end();
})
.listen(PORT);