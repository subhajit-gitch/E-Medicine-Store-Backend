const express = require('express');
const userRouter = express.Router();

//consuming user model/
const userModel = require("../models/user.model");
//Database
const con = require('../models/connection');
const bcrypt = require('bcryptjs');

//loading the json webtoken
const jwt = require('jsonwebtoken');
//loading the dotenv lib.
const env = require('dotenv').config();
   
function createHashPass(passWord){
    var salt = bcrypt.genSaltSync(10);
    var hashPass = bcrypt.hashSync(passWord, salt);
    return hashPass;
// Store hash in your password DB.
}

function checkPass(passWord,hashPass){
    // Load hash from your password DB.
  var isValid = (bcrypt.compareSync(passWord, hashPass)) ? true : false;
  return isValid;
}
 //create signin / login api
 userRouter.post("/signin",(req,res)=>{
    //whether user exists with email id or not.
    //if exists then fetch the hashedPassword of the user and
    //send it to checkPass() for verification if verification
    //has passed then login cridentials are ok otherwise invalid.
     userModel.findOne({"email":req.body.email})
              .exec()
              .then((userInfo)=>{
                    if(userInfo){
                    //  res.status(200).json(userInfo);
                      let db_hashed_pass = userInfo.pass1;
                      var isMatch= (checkPass(req.body.pass1,db_hashed_pass))? true : false;
                      if(isMatch){
                         //we will create the token.
                         var token = jwt.sign({"user_id":userInfo._id},process.env.PRIVATE_KEY,{expiresIn:'1h'});

                        res.status(200).json({"message":"success","user":userInfo,"token":token});
                       
                      }else{
                        res.status(200).json({"message":"Wrong Cridentials"});
                      }
                    }else{
                       res.status(200).json({"message":"user doesnt exists"});
                    }
              })
              .catch((error)=>{
                  res.status(200).json(error);
              })  
});

//user's signup , login , pass change api .
userRouter.post("/signup",(req,res)=>{
    //res.status(200).json("signup");
       userModel.create({
           "name":req.body.name,
           "email":req.body.email,
           "phone":req.body.phone,
           "pass1":createHashPass(req.body.pass1)
       }).then((userInfo)=>{
             if(!userInfo){
                 res.status(200).json({"message":"signup_error"});
             }else{
                 res.status(200).json({"message":"signup_success"});
             }
       })
         .catch((error)=>{
            //  res.status(200).json(error);
              if(error.errors){
                  if(error.errors.email){
                      res.status(200).json({"message":error.errors.email.message});
                  }else if(error.errors.phone){
                    res.status(200).json({"message":error.errors.phone.message});
                   
                  }
              }else {
              if(error.keyPattern.email){
                    res.status(200).json({"message":"email is already registered Please try with different email"});
              }
              if(error.keyPattern.phone){
                  res.status(200).json({"message":"Phone Number is already registered Please try with different email"});
                     
              }
            }
               

            });
 
})


module.exports = userRouter;
console.log("user router is ready to use");
