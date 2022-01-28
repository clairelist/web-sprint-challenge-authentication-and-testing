//include db from db config !
const lego = require('../../data/dbConfig.js');
//build getAll functionality
//before we build these, be SURE TO RUN MIGRATION ON THE DATABASE AND OPEN IT IN SQLITE !!!!!
//table 'users', select * from users
function getAll(){
    return lego('users').select(); //nothing passed here, since we are returning all fields from the users table!
}

//build getById for callback of below --callback DEPRECATED
//select * from users where id = user_id
function getById(id){
    return lego('users')
        .select()
        .where('id',id).first();
}

//build getByFilter for calling on checky of username existy !
async function getByFilter(filter){
    return lego('users')
        .select('username')
        .where(filter);
}
//build create which checks for existing user, then returns that user if not existy before !
//we are only using one table, so we don't need to use a transaction here.
//it will be simple :)
function create({username,password}){
    return lego('users').insert({username,password})
      .then(([id]) => {
        return lego('users').where('id',id).first(); //NOT an array ! first method fixes this
      })
}

//EXPORTR SECTION
module.exports = {
    getAll,
    getByFilter,
    create,
    getById
}