const os = require('os')

//information about the user
console.log(os.userInfo());

//information about the system uptime in seconds
console.log(`The system uptime is ${os.uptime()} seconds`);

//information about the OS
const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMemory:os.totalmem(),
    freeMemory:os.freemem(),
}
console.log(currentOS);