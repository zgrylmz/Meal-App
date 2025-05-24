import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRecipesByIngredient = createAsyncThunk("getRecipesByIngredient",async(ingredientName)=>{

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/getRecipeByIngredient`,{ingredientName},
        {withCredentials:true});
        return response.data
});

const authSlice = createSlice({
    name: "IngredientSlice",
    initialState: {
    "RecipesWithIngredient":""        
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getRecipesByIngredient.fulfilled,(state,action)=>{
            state.RecipesWithIngredient = action.payload;
        });
    }
});


export default authSlice.reducer;
