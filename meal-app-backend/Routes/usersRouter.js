const {Router} = require("express");
const userController = require("../controller/userController");
const {checkUser, requiredToken} = require("../middleware/middleware");
const router = Router();


// router.get("*",checkUser);
router.get("/getAllUsers",userController.getAllUsers);
router.post("/deleteOneUser/:id",userController.deleteOneUser);
router.post("/Login",userController.login);
router.get("/currentUser", userController.getAuthenticatedUser);
router.post("/logout", userController.logout);
router.post("/sign",userController.signUp);

router.post("/add-favorite", userController.addFavorite);
router.post("/removeFavoriteItem",userController.removeFromFavorites);
router.get("/favorites/:userId", requiredToken,userController.getFavorites);
router.post("/getComments",userController.getCommentsOfUser)

// router.get("/Sign/:id",userController.signUpConfirm);

module.exports = router;



//farkinda olma kiymetini bilme siradan görmeme vs vs 