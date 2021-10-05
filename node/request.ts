import * as http from 'http' // Import HTTP module
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

const Status = {
    200: 'OK',
    404: 'Not Found'
};
export default request;
export {request, Status};
module.exports = {
	request, Status 
};