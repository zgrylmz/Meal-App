const Recipe = require("../model/Recipes");
const Users = require("../model/Users");

module.exports.addNewRecipe = async(req,res)=>{
    try {
        const {name,ingredients,instructions,author,prepTime,cookTime,thumbnail,country,Category} = req.body;
        const newRecipe = await Recipe.create({ name, ingredients, instructions, author, prepTime, cookTime,thumbnail,country,Category });
        return res.status(200).json(newRecipe);
    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports.getAllRecipes = async(req,res)=>{
    try {
        const allRecipes = await Recipe.find(); // .select("") dedikten sonra tirnak isareti arasina yazdigin row'u cagiriyor mesela igredients yazarsan sadece ingredients'i cagiriyor
        res.status(200).json(allRecipes);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

module.exports.getRecipePerId= async(req,res)=>{
    try {
        const id = req.params.id;
        
        const recipe = await Recipe.findById(id);
        res.json(recipe);

    } catch (error) {
        res.status(404).json({error:error.message});
    }
}


module.exports.getDesserts = async(req,res)=>{
        const {category} = req.body
    try {
    const beefRecipes = await Recipe.find({ Category: category });
    const beefRecipes1 = await Recipe.find({Category:"Pasta"})
    const beefRecipes2 = await Recipe.find().select("Category"); 

    res.json(beefRecipes);

    } catch (error) {
        res.json({error:error.message});
    }
}


module.exports.setRating = async (req, res) => {
    const { rating, userId, recipeName, numberOfRating,id } = req.body;
  
    try {
      const findRecipe = await Recipe.findById(id);
      const user = await Users.findById(userId);
  
      if (!findRecipe || !user) {
        return res.status(404).json({ error: "Recipe or user not found" });
      }
  
      // Check if user already rated this recipe
      const existingRating = user.ratedRecipies.find((r) => r.name === recipeName);
  
      if (existingRating) {
        // Update recipe rating: remove old rating, add new one
        findRecipe.rating -= existingRating.rating;
        findRecipe.rating +=rating;
        
        // Update user's rating for that recipe
        existingRating.rating = rating;
      } else {
      
        //Give first time a rating for the recipe  
        findRecipe.numberOfRating += 1;
        findRecipe.rating += rating;
  
        // Save new rating in user's ratedRecipies
        user.ratedRecipies.push({ name: recipeName, rating:rating });
      }
  
      await user.save();
      await findRecipe.save();
  
      return res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  module.exports.saveComments = async(req,res)=>{
        const {id,comment,userId,recipeName}= req.body
    try {
        const callRecipe = await Recipe.findById(id);
        const user = await Users.findById(userId);


        if(!callRecipe || !user){
            return res.json({message:"Recipe or User not found"});
        }
        callRecipe.comments.push({comment});
        user.commentsOfUser.push({recipeName,comment});

        await callRecipe.save();
        await user.save();
        res.json(callRecipe.comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }


  module.exports.deleteComment = async(req,res)=>{
    const {id,comment} = req.body;
    try {
        const recipe = await Recipe.findById(id);
        const recipesComment = recipe.comments.find((r)=>r.comment === comment);

            if(!recipesComment){
            return res.json({message :"Recipe not found"});
            }  
            recipe.comments.pull({comment});
            
            await recipe.save();
            res.json("oldu");
    } catch (error) {
        res.status(500).json({error:error.message});
    }
  }