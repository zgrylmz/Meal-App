const { Router } = require("express");
const recipeController = require("../controller/recipeController");
// const {getAuthenticatedUser} = require("../controller/userController");
const { requiredToken } = require("../middleware/middleware")
const router = Router();

router.post("/addNewRecipe", recipeController.addNewRecipe);
router.post("/addNewRecipeUpgrated", recipeController.addNewRecipeUpgrated)
router.delete("/deleteOneRecipe", recipeController.deleteOneRecipe);
router.get("/Recipes", requiredToken, recipeController.getAllRecipes);
router.get("/recipe-details/:id", recipeController.getRecipePerId);
router.get("/getBeefRecipes", recipeController.getDesserts);
router.post("/setRating", recipeController.setRating);
router.post("/saveComment", recipeController.saveComments);
router.delete("/deleteComment", recipeController.deleteComment);
router.put("/updateComment", recipeController.updateComment)
router.get("/getAllRecipesPegination/:page", recipeController.getAllRecipesPegination);
router.post("/getOneSingleRecipe/:id", recipeController.getOneSingleRecipe);
router.post("/getRecipesByName", requiredToken,recipeController.getRecipesPerName);
router.post("/getRecipeByIngredient", requiredToken,recipeController.getRecipePerIngredient)



module.exports = router;