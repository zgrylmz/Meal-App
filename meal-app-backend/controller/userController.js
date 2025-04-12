const Users = require("../model/Users")
const Recipe = require("../model/Recipes");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const Mail = require("nodemailer/lib/mailer");


const create_jwt_token_for_login = (id,email)=>{
    return jwt.sign({id,email},process.env.SECRET_JWT_KEY,{expiresIn:"1h"});
}

const create_jwt_for_sign = (id,mail)=>{
    return jwt.sign({id,mail},process.env.SECRET_JWT_KEY,{expiresIn:"1h"});
}



module.exports.signUp = async (req, res) => {
    const { name, age, email, password } = req.body;

    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ error: "User already has an account" }); // ✅ use return to stop execution
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            name,
            age,
            email,
            password: hashPassword
        });

        const token = create_jwt_for_sign(user._id, user.email);

        res.cookie("jwt", token, { httpOnly: true, maxAge: 3000000 });

        return res.json({
            user: { id: user._id, name: user.name, email: user.email }, // ✅ also fixed "singleUser" to "user"
            redirectUrl: "/"
        });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const singleUser = await Users.login(email, password);
        const token = create_jwt_token_for_login(singleUser._id, singleUser.email);

        res.cookie("jwt", token, { httpOnly: true, maxAge: 3000000 });

        res.json({
            user: { id: singleUser._id, name: singleUser.name, email: singleUser.email },
            redirectUrl: "/"
        });
    } catch (error) {
        res.status(401).json({ error: error.message }); // Send error response
    }
};


module.exports.getAuthenticatedUser = async(req,res)=>{
    
    const token = req.cookies.jwt;
    if(!token) return res.status(401).json({error:"Not authenticated"});

    jwt.verify(token,process.env.SECRET_JWT_KEY, async(err,decodedToken)=>{
        if(err) return res.status(403).json({error:"Invalid token"});

        const user = await Users.findById(decodedToken.id).select("-password");
        if(!user) return res.status(404).json({eror:"User not found"});
        // res.status(401).json({redirectUrl:"/"});
        res.json({user});
    });
}

module.exports.logout = async(req,res)=>{
    res.clearCookie("jwt");
    res.json({message:"Logged out successful"});
}

module.exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await Users.find();
        res.json(allUsers);
    } catch (error) {
        res.status(400).json({ error })
    }
}


module.exports.deleteOneUser = async (req, res) => {
    try {

        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// module.exports.addFavoriteRecipe = async(req,res)=>{
//     try {
//         const recipe = await Users.findById(req.) 
//     } catch (error) {
        
//     }
// }


module.exports.addFavorite = async (req, res) => {
    const { userId, favoriteItem } = req.body; 

    try {
        
        const user = await Users.findById(userId);
        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Check if the recipe already exists in favorites
        if (user.favorites.includes(favoriteItem)) {
            return res.status(400).json({ message: "Recipe already in favorites" });
        }

        // ✅ If not, add it
        user.favorites.push(favoriteItem);
        await user.save(); // ✅ Save changes

        res.json({ message: "Favorite added successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error adding favorite", error: error.message });
    }
};



module.exports.getFavorites = async (req, res) => {
    const { userId } = req.params; // ✅ Get user ID from request params

    try {
        // ✅ Find user and select only the favorites array
        const user = await Users.findById(userId).select("favorites"); //.select("") dedikten sonra tirnak isaretinin icine herhangi bir row'un adini yazarsan onu cagirir

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Error fetching favorites", error: error.message });
    }
};

module.exports.removeFromFavorites = async(req,res)=>{
    const { userId, favoriteItem } = req.body; 

    try {

        const user = await Users.findById(userId);
        if(!user){
            res.status(404).json({message:"User not found"});
        }

        if(!user.favorites.includes(favoriteItem)){
            res.status(404).json({message:"Item not found"})
        }
         user.favorites.pull(favoriteItem);
         await user.save();

         res.json({message:"Item has been succesfully removed",user});
    
} catch (error) {
        res.status(500).json({message:error.message});
}

}
