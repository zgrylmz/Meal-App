import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { Axios } from 'axios';

// ✅ Send userId and favoriteItem in the request
export const addFavoriteRecipes = createAsyncThunk("addFavoriteRecipes", async ({ userId, favoriteItem }) => {
    await axios.post(
        `${import.meta.env.VITE_API_URL}/add-favorite`, 
        { userId, favoriteItem }, // ✅ Send data in request body
        { withCredentials: true }  // ✅ Send cookies with request
    );
    // return response.data.user; // ✅ Return updated user object
    return null;
});

export const callFavoriteRecipes = createAsyncThunk("callFavoriteRecipes", async ({ userId }) => {
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/${userId}`, 
        { withCredentials: true }
    );
    return response.data.user; // ✅ Get only the favorites array
});

export const removeFromFavoriteRecipes = createAsyncThunk("removeFromFavorites", async({userId,favoriteItem})=>{
    await axios.post(     
        `${import.meta.env.VITE_API_URL}/removeFavoriteItem`, 
        { userId, favoriteItem }, // ✅ Send data in request body
        { withCredentials: true }  // ✅ Send cookies with request)
    );
});


export const getFavoritRecipesWithContent = createAsyncThunk("getFavoritRecipesWithContent",async ({ recipeName }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/getRecipesByName`,
        { recipeName },
        { withCredentials: true }
      );
      return response.data;
    }
  );
  

export const recipeSlice = createSlice({
    name: 'favoriteRecipes',
    initialState: {
        userId:null, // ✅ Added entities to prevent errors
        favoriteRecipe:null,
        favoriteRecipesWithContent:null
    },
    reducers: {
        setUserId:(state,action)=>{
            state.userId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addFavoriteRecipes.fulfilled, () => {
          alert("Recipe has been added into your Favorite recipes");  
            // ✅ Store updated user in Redux (if needed)
        });
        builder.addCase(callFavoriteRecipes.fulfilled,(state,action)=>{
            state.favoriteRecipe = action.payload;
        });
        builder.addCase(getFavoritRecipesWithContent.fulfilled,(state,action)=>{
            state.favoriteRecipesWithContent = action.payload
        });
    }
});

export const { setUserId } = recipeSlice.actions;
export default recipeSlice.reducer;
