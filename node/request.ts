import * as http from 'http' // Import HTTP module
declare module 'http' {
    interface IncomingMessage {
        rawBody: str;
        body: strObj;
    }
}

async function request(url: str): Promise<str> {
    return new Promise((resolve, reject)=>{
        const request = http.get(url, (res)=>{
            let chunks = [];

            if (res.statusCode < 200 || res.statusCode >= 300) {
               return reject('Bad status code')
            }

            // collect data
            res.on('data', (chunk => {
                chunks.push(chunk)
            }))

            // resolve on end of request
            res.on('end', () => {
                let body = Buffer.concat(chunks).toString();
                return resolve(body)
            });
        });
        request.end();
    });
}
async function getBody(req: http.IncomingMessage): Promise<str>{
    return new Promise((resolve, reject)=>{
        let data = []
        req.on('data', (chunk)=>{
            data.push(chunk)
        })
        .on('error', (err)=>{
            reject(err);
        })
        .on('end', ()=>{
            let rawBody = Buffer.concat(data).toString()
            req.rawBody = rawBody;
            var query = rawBody.split('&');
            var items: strObj;
            for(var i of query){
                var [key, value] = i.split('=');
                items[key] = value;
            }
            req.body = items;
            resolve(rawBody);
        });
        
    });
}

const Status: {[key: int]: str} = {
    200: 'OK',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    405: 'Method Not Allowed',
    501: 'Not Implemented'
};
export default request;
export {request, getBody, Status};
module.exports = {
	request, Status, getBody
};