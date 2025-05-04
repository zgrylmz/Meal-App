const  User =  require("../model/Users")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")


const requiredToken = async (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.SECRET_JWT_KEY,async(err,decodedToken)=>{
            if(err){
                console.log("Token is not verifiedddd");
                res.json({redirectUrl:"/login"});
            }else{
                console.log("Token is verified!");
                next();
            }
        })
    }else{
        console.log("Token is not verifieddddd");
        res.redirect({redirectUrl:"/login"});
    }
}

module.exports = { requiredToken };