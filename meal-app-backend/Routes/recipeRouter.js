const {Router} = require("express");
const recipeController = require("../controller/recipeController");
// const {getAuthenticatedUser} = require("../controller/userController");
const {requiredToken} = require("../middleware/middleware")
const router = Router();

router.post("/addNewRecipe",recipeController.addNewRecipe);
router.get("/Recipes",requiredToken,recipeController.getAllRecipes);
router.get("/recipe-details/:id",recipeController.getRecipePerId);

router.get("/getBeefRecipes", recipeController.getDesserts);
router.post("/setRating",recipeController.setRating);

router.post("/saveComment",recipeController.saveComments);

router.delete("/deleteComment",recipeController.deleteComment);


module.exports = router;