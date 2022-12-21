const fs =  require('fs');
const util = require('util')

const readingFile = util.promisfy(fs.readFile) 

const writeTheFile = (location,user) =>
  fs.writeFile(location, JSON.stringify(user, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nData written to ${location}`))
