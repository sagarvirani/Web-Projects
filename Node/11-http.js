const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.end('Welcome to our homepage');
    }
    else if(req.url === '/about'){
        res.end('Welcome to our history page');
    }
    else {
        res.end(`
                <h1>Oops!!>
                <p>We cannot find the page you are looking for</p>
                <a href='/'>Home Page</a>
               `);
    }
});
server.listen(5000);