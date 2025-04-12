import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const setRatingsOfRecipes = createAsyncThunk("setRating", async ({rating,userId,recipeName,numberOfRating,id}) => {
        await axios.post(`${import.meta.env.VITE_API_URL}/setRating`, 
        {rating,userId,recipeName,numberOfRating,id},{ withCredentials: true }); 
});

export const setRatingsOfUser = createAsyncThunk("setRatingOfUser",async()=>{
    await axios.post(`${import.meta.env.VITE_API_URL}/setRatingOfUser`, 
        {},{ withCredentials: true }); 
});

export const recipeSlice = createSlice({
  name: 'rankingSlice',
  initialState: {
   rating:0,
   numberOfRating:0
  },
  reducers: {
    
  }
});

export default recipeSlice.reducer;
