//this handles the JWT secret !
//obfuscation:: they can't find the secret if they don't know the language the word is written in ;)
module.exports = {
    JWT_SECRET : process.env.JWT_SECRET || 'shh'
  }