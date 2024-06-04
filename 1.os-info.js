const os = require('node:os');

console.log('System information: ');
console.log('-------------------------------------');

console.log('Platform: ' + os.platform());
console.log('Architecture: ' + os.arch());
console.log('Version: ' + os.version());
console.log('CPUs: ' + os.cpus().length);
console.log('Free memory: ' + os.freemem() / 1024 / 1024 + ' MB');
console.log('Total memory: ' + os.totalmem() / 1024 / 1024 + ' MB');
console.log('Uptime: ' + os.uptime() / 60 + ' minutes');
