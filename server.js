const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const API_KEY = '953f27ca082c420ab6d131814260706'; 

const server = http.createServer((req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);

    if (urlObj.pathname === '/api/weather') {
        const city = urlObj.searchParams.get('city') || 'Boryspil';
        const apiUrl = `https://weatherapi.com{API_KEY}&q=${encodeURIComponent(city)}&lang=uk`;

        http.get(apiUrl, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => data += chunk);
            apiRes.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            });
        }).on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        });
        return;
    }

    let filePath = urlObj.pathname === '/' ? './index.html' : '.' + urlObj.pathname;
    const extname = path.extname(filePath);
    
    let contentType = 'text/html';
    if (extname === '.js') contentType = 'text/javascript';
    if (extname === '.css') contentType = 'text/css';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

