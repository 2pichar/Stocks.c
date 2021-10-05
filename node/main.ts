import * as stocks from './stocks'
import * as http from 'http'
import * as fs from 'fs'

const notfound404 = '404: Page Not Found'

const server = http.createServer();
server.on('request', (req, res)=>{
    var path = req.url ?? '/';
    var url = new URL(path, req.headers.host);
    var html: str = '';
    var code = 200;
    var msg = Status[200];
    if(path.endsWith('.html')){
        try{
            html = fs.readFileSync(`./html/${path}`, 'utf-8');
        } catch(e) {
            code = 404;
            msg = Status[404];
        }
    }
    if (path == '/') {
        html = fs.readFileSync('./html/index.html', 'utf-8');
    }
    
    res.writeHead(code, msg, {
        'Content-Length':Buffer.byteLength(html),
        'Content-Type': `text/${(code == 200) ? 'html' : 'plain'}`
    })
    res.write(html);
    res.end();
});