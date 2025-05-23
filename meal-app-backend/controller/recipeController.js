const Recipe = require("../model/Recipes");
const Users = require("../model/Users");
const mongoose = require("mongoose");

module.exports.addNewRecipeUpgrated = async(req,res)=>{
  const {name,ingredients,instructions,author,prepTime,cookTime,thumbnail,country,Category,createdBy} = req.body;
    try {
       
        const newRecipe = await Recipe.create({ name, ingredients, instructions, author, prepTime, cookTime,thumbnail,country,Category,createdBy });
        return res.status(200).json({
          redirectUrl:"/Recipes",
          newRecipe
        });
    
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports.addNewRecipe = async(req,res)=>{
  const {name,ingredients,instructions,author,prepTime,cookTime,thumbnail,country,Category,numberOfRating,rating,comments} = req.body;
    try {
       
        const newRecipe = await Recipe.create({ name, ingredients, instructions, author, prepTime, cookTime,thumbnail,country,Category,numberOfRating,rating,comments });
        return res.status(200).json({
          redirectUrl:"/Recipes",
          newRecipe
        });
    
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
    // const beefRecipes1 = await Recipe.find({Category:"Pasta"})
    // const beefRecipes2 = await Recipe.find().select("Category"); 

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
  

  // module.exports.saveComments = async(req,res)=>{
  //       const {id,comment,userId,recipeName}= req.body
  //   try {
  //       const callRecipe = await Recipe.findById(id);
  //       const user = await Users.findById(userId);


  //       if(!callRecipe || !user){
  //           return res.json({message:"Recipe or User not found"});
  //       }
  //       callRecipe.comments.push({comment});
  //       user.commentsOfUser.push({recipeName,comment});

  //       await callRecipe.save();
  //       await user.save();
  //       res.json(callRecipe.comments);
  //   } catch (error) {
  //       res.status(500).json({ error: error.message });
  //   }
  // }


  module.exports.saveComments = async (req, res) => {
    const { id, comment, userId, recipeName,emailOfTheUser,nameOfTheUser } = req.body;
  
    try {
      const callRecipe = await Recipe.findById(id);
      const user = await Users.findById(userId);
  
      if (!callRecipe || !user) {
        return res.status(404).json({ message: "Recipe or User not found" });
      }
  
      // Create a shared comment object with a custom _id
      const commentId = new mongoose.Types.ObjectId();
      const commentObject = {
        _id: commentId,
        comment,
        createdAt: Date.now(),
       
      };
      
  
      // Add comment to the recipe
      callRecipe.comments.push(
        {...commentObject,
        IdOfTheuser:userId,
        emailOfTheUser,
        nameOfTheUser,
        }
      );
  
      // Add comment to the user (with recipe name)
      user.commentsOfUser.push({
        ...commentObject,
        recipeName,
      });
  
      await callRecipe.save();
      await user.save();
  
      res.json(callRecipe.comments); // Return updated comments
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

  module.exports.deleteComment = async(req,res)=>{
    const {id,commentId,userId} = req.body;
    try {
        const recipe = await Recipe.findById(id);
        const user = await Users.findById(userId);
        
        const recipesComment = recipe.comments.find((r)=>r.id === commentId);
        const recipesUserId= recipe.comments.find((r)=>r.IdOfTheuser === userId);


            if(!recipesComment || !user){
            return res.json({message :"Recipe or User not found"});
            } 
            if(!recipesUserId){
              return res.json({message:"You cant delete this comment"})
            }

           recipe.comments.pull({_id:recipesComment.id});
           user.commentsOfUser.pull({_id:recipesUserId.id});
            
            await recipe.save();
            await user.save();
            res.json(recipe.comments);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
  }


  module.exports.updateComment = async (req, res) => {
    const { id, commentId, newComment,userId } = req.body;
  
    try {
      const recipe = await Recipe.findById(id);
      const user = await Users.findById(userId);

      const targetComment = recipe.comments.find((r)=>r.id === commentId && r.IdOfTheuser === userId);
      const targetCommentForUser = user.commentsOfUser.find((r)=>r.id === commentId);

      if (!targetComment ||  !targetCommentForUser) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if(targetComment.IdOfTheuser !== userId){
        return res.status(404).json({message:"Not your comment"});
      }

      targetComment.comment = newComment;
      targetCommentForUser.comment = newComment;
      
      await recipe.save();
      await user.save();
      res.json(recipe.comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  


  // route: GET /getAllRecipes/:page
module.exports.getAllRecipesPegination = async (req, res) => {

  try {
      const page = req.params.page || 1;
      const limit = req.query.limit || 10;
      
      const skip = (page-1) * limit;

      const recipes = await Recipe.find()
      .skip(skip)
      .limit(limit)
      .sort({createdAt:1});

      const totalCount = await Recipe.countDocuments();

      res.json({
        recipes,
        totalPages: Math.ceil(totalCount/limit),
        totalCount,
        page,


      })
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getOneSingleRecipe = async(req,res)=>{
        const id = req.params.id;
  
    try {
      
      const singleRecipe = await Recipe.findById(id);

      if(!singleRecipe){
        res.status(401).json("Recipe not found");
      
      }
        res.json(singleRecipe);
    } catch (error) {
      res.status(500).json({error : error.message})
    }
}


module.exports.getRecipesPerName = async(req,res)=>{
  
  const { recipeName } = req.body;

  try {
      
    const arrForRecipes = [];

    for (const name of recipeName) {
      
      const recipe = await Recipe.find({ name:name });
      arrForRecipes.push(recipe);
    }
     
    res.json(arrForRecipes.flat()); // 

  } catch (error) {
    res.status(404).json({error:error.message})
  }
} 

module.exports.deleteOneRecipe= async(req,res)=>{
  try {
     const {recipeId} = req.body;
      
      const recipe = await Recipe.findById(recipeId);
      if(!recipe){
       return res.status(404).json("Recipe not found");
      }
      const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
     
      await deletedRecipe.save();
      return res.json(deletedRecipe);
  } catch (error) {
      res.status(404).json({error:error.message});
  }
}


module.exports.getRecipePerIngredient = async(req,res)=>{
  const {ingredientName} = req.body;
  try {
      const MyIngredients = []

     
        const RecipesWithThisIngredient = await Recipe.find();
        
        RecipesWithThisIngredient.map((item)=>{
          ingredientName.map((ingredient)=>{
            item.ingredients.map((ing)=>{
              if(ing.toLocaleLowerCase().includes(ingredient.toLowerCase())){
                MyIngredients.push(item)
              }
            })
            
          })
        });
          const removeDuplicatesFromArray = [...new Set(MyIngredients)];
      res.json(removeDuplicatesFromArray);
  } catch (error) {
    res.status(500).json({message:error.message}); 
  }
}