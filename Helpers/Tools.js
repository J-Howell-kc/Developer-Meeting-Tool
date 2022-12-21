const fs =  require('fs');
const util = require('util')
// reading file  for reading different modules for data working with apis
const readingFile = util.promisfy(fs.readFile) 
//a function intended for writing down data to the file you want (location)
const writeTheFile = (location,login) =>{
  fs.writeFile(location, JSON.stringify(login, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nData written to ${location}`))
}
// function used to keep track of data about users login time and log out time
  function userActive(loginFormHandler,logout){
    let login = new Date().toJSON();
    let loggedOut = new Date().toJSON();
 if(loginFormHandler == true){
  console.log(`user logged in at ${login}`)
writeTheFile(location,login)
 }else if(logout == true){
    console.log(`user logged in at ${loggedOut}`)
    writeTheFile(location,logout)
 }
 
  }
  module.exports = readingFile,writeTheFile, userActive;