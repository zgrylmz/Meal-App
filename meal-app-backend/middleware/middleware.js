const  User =  require("../model/Users")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv")

// const checkuser = async (req, res, next) => {

//     const token = req.cookies.jwt;

//     if (token) {
//         jwt.verify(token, "2182312c81187ab82bbe053df6b7aa55", async (err, decodedToken) => {
//             if (err) {
//                 res.locals.user = null;
//                 next();

//             } else {
//                 let user = await User.findById(decodedToken.id);
//                 res.locals.user = user;
//                 next();
//             }
//         });
//     } else{ 
//         res.locals.user = null;
//         next();
//     }

// }

const requiredToken = async (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.SECRET_JWT_KEY,async(err,decodedToken)=>{
            if(err){
                console.log("Token is not verifiedddd");
                res.json({redirectUrl:"/login"});
            }else{
                console.log("Token is verified");
                next();
            }
        })
    }else{
        console.log("Token is not verified");
        res.redirect({redirectUrl:"/login"});
    }
}

module.exports = { requiredToken };