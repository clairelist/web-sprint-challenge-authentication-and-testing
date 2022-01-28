//checkUNval, checkPassword
const {getByFilter} = require('../auth/dads-model');

const checkUserVal = async (req,res,next) => { //this goes on login route !
    try{
        const [user] = await getByFilter({username:req.body.username});
      if(!user){
        res.status(401).json({message: 'invalid credentials'})
    } else {
        req.user = user;
        next();
    }
} catch(err){
        next(err);
    }
}

const checkBody = (req,res,next)=>{
    //if null username or password, return 'username and password required'
    if(!req.body.username || !req.body.password){
        res.status(401).json({message: 'username and password required'})
    } else {
      req.body.password = req.user.password;
      
        next();
    }
}

const checkUserExisty = async (req,res,next) => { //basically the inverse of checkUserVal;; if user exists already, return failstate
    try{
        const [user] = await getByFilter({username:req.body.username});
      if(user){
        res.status(401).json({message: 'username taken'})
    } else {
        req.user = user;
        next();
    }
} catch(err){
        next(err);
    }
}

module.exports = {
    checkUserVal,
    checkBody,
    checkUserExisty
}