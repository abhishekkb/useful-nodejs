let http = require('http');
let https = require('https');

module.exports.httpGet = (uri, headers)=>{

    let options = {
        host: uri,
        headers: headers
    };

    // return new pending promise
    return new Promise((resolve, reject) => {
        let lib = uri.startsWith('https') ? https: http;
        let request = lib.get(options, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('error status code: ' + response.statusCode + "|" + JSON.stringify(response.body)));
            }

            let body = [];

            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')));
        });
        request.on('error', (err) => reject(err))
    });
};

module.exports.httpPost = (uri, headers, data)=>{

    let options = {
        host: uri,
        headers: headers
    };

    // return new pending promise
    return new Promise((resolve, reject) => {
        let lib = uri.startsWith('https') ? https: http;
        let request = lib.post(options, (response) => {
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('error status code: ' + response.statusCode + "|" + JSON.stringify(response.body)));
            }

            let body = [];

            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            response.on('end', () => resolve(body.join('')));
        });

        request.on('error', (err) => reject(err));
        if(data){
            request.write(data);
        }
        request.end();
    });
};
