const { readFile, writeFile } = require('fs').promises;

// const util = require('util');
// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);

const start = async () => {
    try{
        const first = await readFile ('./Node/content/first.txt', 'utf8');
        const second = await readFile ('./Node/content/second.txt', 'utf8');
        await writeFile (
            './Node/content/result-mind-grenade.txt',
            `Final result after concatination: ${first} , ${second}`
        );

    }
    catch (error) {
        console.log(error);

    }
};

start()