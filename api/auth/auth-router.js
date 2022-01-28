//DATA section, as always
const {checkUserVal, checkBody, checkUserExisty} = require('../middleware/other-middleware');
const { JWT_SECRET } = require("../geheimnisse"); // called so to obfuscate in the codebase!
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Dad = require('./dads-model');

const router = require('express').Router();

//LOGIC sectionr
//unit function for building a token, used in login !
function buildToken(user){
  const payload = {
    subject: user.user_id,
    username: user.username
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload,JWT_SECRET,options);
}

router.post('/register', checkBody, checkUserExisty,(req, res, next) => { //pass checkUserExist, checkBody here !
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG" // are you sure lol?
      }
      getById call here !

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
      const {username, password} = req.body;
      const hashr = bcrypt.hashSync(password,8); //8 is of course a holy number
    
      Dad.create({username, password: hashr})
        .then(registered=>{
          res.status(201).json(registered)
        })
        .catch(next)
});

router.post('/login', checkUserVal, checkBody, (req, res,next) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
      if (bcrypt.compareSync(req.body.password, req.user.password)){
        const token = buildToken(req.user);
        res.status(200).json({message:`welcome, ${req.user.username}`, token});
      } else {
        next({status: 401, message: 'invalid credentials'}); //password failstate
      }
});

module.exports = router;
