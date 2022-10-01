const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var fetchUser = require('../middleware/fetchUser.js');

// passowrd securtiy 
var bcrypt = require('bcryptjs');

// token for login users
var jwt = require('jsonwebtoken');

// const string for sign webtoken
const JWT_SECRET  = 'yo@vmro';


// ROUTE -1 : create a user using POST "/api/auth/createuser" . NO Login required; 
router.post('/createuser' ,[ 
    body('name','Enter your valid name').isLength({min : 1}),
    body('email' , 'Enter your valid e-mail').isEmail(),
    body('password','Enter your valid password(at least 8 characters)').isLength({min : 8}),
], async (req , res) => {
  // if there are errors returns bad request / errors;
  let success  = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
   
    // check weather the user with the same email already exist

    try{

    // check wheather email exist or not ;
      let user = await User.findOne({ email : req.body.email});
      if(user){
        return res.status(400).json({success , error : "sorry ! user with this email already exists"});
      }
      

      // making salt 
      const salt =await bcrypt.genSalt(10);
      // add hasing
      let setPass = await bcrypt.hash(req.body.password, salt);
  
        user = await  User.create({
          name: req.body.name,
          email : req.body.email,
          password: setPass,
        });
        const data = {
          user : {
            id : user.id
          }
        }
        const authToken = jwt.sign(data , JWT_SECRET);
        success = true;
        res.json({success ,  authToken});
        
      }
    catch(error){
      console.error(error.message);
      res.status(500).json({success , error : "Internal Server error ! !"});
    }

})

// ROUTE - 2 :  Authenticate a user using POST "/api/auth/login" . NO Login required;
router.post('/login' ,[ 
  body('email' , 'Enter your valid e-mail').isEmail(),
  body('password','passwrod cannot be blank').exists(),
], async (req , res) => {
  let success = false;
// if there are errors returns bad request / errors;
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({ success  ,  errors: errors.array() });
}

const {email, password} = req.body;
try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({ success  , error : "Please try to login with correct Credantials !"});
  } 
  
  const passCompared = await bcrypt.compare(password , user.password);
  if(!passCompared){
    
    return res.status(400).json({success , error : "Please try to login with correct Credantials !"});
  }
  
  const payLoad = {
    user : {
      id : user.id
    }
  }
  const authToken =  jwt.sign(payLoad , JWT_SECRET);
  success = true;
  res.json({ success,  authToken});
}
  catch(error){
    console.error(error.message);
    res.status(500).json({error : "Internal Server error !"});
  }
});


// ROUTE - 3 : get logged in user details using POST "/api/auth/getUser" . Login required (we will send JWT TOKEN)  : 

router.post('/getuser' ,fetchUser,  async (req , res) => {

  
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
    
  } catch(error){
    console.error(error.message);
    res.status(500).json({error : "Internal Server error !"});
  }



});  
module.exports =  router;   