const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
function checkJWT(req,res,next){
    jwt.verify(req.headers.token,process.env.PRIVATE_KEY,(error,decodedData)=>{
        if(error){
            console.log(error);
           return res.status(200).json({"error":"Token is either missing or expired login again"});
           
        }else {
             next();
        }
    });
}

 module.exports = checkJWT;
 console.log("check-auth middleware is working fine..");