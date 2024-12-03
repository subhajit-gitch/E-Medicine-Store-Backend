const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const userModel = require('../models/user.model');
function checkJWTAdmin(req,res,next){
    jwt.verify(req.headers.token,process.env.PRIVATE_KEY,(error,decodedData)=>{
        if(error){
            console.log(error);
           return res.status(200).json({"error":"Token is either missing or expired login again"});
           
        }else {
               userModel.findOne({"_id":decodedData.user_id})
                        .exec()
                        .then((userInfo)=>{
                              if(userInfo.role =='admin'){
                                   next();
                              }else {
                                return res.status(200).json({"message":"only admin can perform this task"});
                              }
                        })
                        .catch((error)=>{
                              if(error)
                                return res.status(200).json(error);
                        });
        }
    });
}

 module.exports = checkJWTAdmin;
 console.log("check-admin middleware is working fine..");