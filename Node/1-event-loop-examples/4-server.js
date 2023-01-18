const http = require('http');

const server = http.createServer( (request, respond)=>{
    console.log('request event');
    respond.write('Hello world');
    respond.end();
});

server.listen(5000, ()=> {
    console.log('Server listening on port 5000...');
});