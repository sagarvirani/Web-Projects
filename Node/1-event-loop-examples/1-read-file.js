const { readFile } = require('fs');

console.log('started the first task');

const first = readFile('./Node/content/first.txt', 'utf8', (error, data) =>{
    if(error){
        console.log(error);
        return;
    }
    console.log(data);
    console.log('completed the first task');
});

console.log('starting the next task');
