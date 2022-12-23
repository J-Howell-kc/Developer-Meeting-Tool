const fs =  require('fs');
const util = require('util');

// reading file  for reading different modules for data working with apis
const readingFile = util.promisify(fs.readFile);
//a function intended for writing down data to the file you want (location)
const writeTheFile = (location,login) =>{
  fs.writeFile(location, JSON.stringify(login, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nData written to ${location}`))
}

  module.exports =  {writeTheFile , readingFile}