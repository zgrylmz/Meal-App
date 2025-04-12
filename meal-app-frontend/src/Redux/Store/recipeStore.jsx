import { configureStore } from '@reduxjs/toolkit'
import myRecipes from "../recipeSlice/recipeSlice"
import authCheck from "../recipeSlice/authSlice"
import addFavorite from "../recipeSlice/addFavoriteRecipes"
import setRankings from "../recipeSlice/rankingSlice"
import saveComments from "../recipeSlice/commentSlice"

export const store = configureStore({
  reducer: {
    recipeSlice:myRecipes,
    auth:authCheck,
    favoriteRecipes:addFavorite,
    rankingSlice:setRankings,
    CommentSlice:saveComments,

  },
})