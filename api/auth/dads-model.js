//include db from db config !
const lego = require('../../data/dbConfig.js');
//build getAll functionality
//before we build these, be SURE TO RUN MIGRATION ON THE DATABASE AND OPEN IT IN SQLITE !!!!!
//table 'users', select * from users

//build getById for callback of below
//select * from users where id = user_id

//build getByFilter for calling getById for checking existing username existy
//build create which checks for existing user, then returns that user if not existy before !
//we are only using one table, so we don't need to use a transaction here.
//it will be simple :)