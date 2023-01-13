const { readFileSync, writeFileSync } = require('fs');

const first = readFileSync('./content/first.txt', 'utf8');
const second = readFileSync('./content/second.txt', 'utf8');

//Reading the content of the files 
console.log(`Content of first file: ${first}`);
console.log(`Content of second file: ${second}`);

//Writing a new file result-sync.txt by concating both the existing files first.txt and second.txt
writeFileSync('./content/result-sync.txt',
              `The result is: ${first}, ${second}`
             );

//Appending the content to the existing file result-sync.txt
writeFileSync('./content/result-sync.txt',
              ` The added content is here.`,
              {flag:'a'}
             );