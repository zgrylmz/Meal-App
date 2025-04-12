import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllRecipesFromMongodb = createAsyncThunk("getRecipes", async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Recipes`, { withCredentials: true }); // ✅ Ensures JWT is sent
    return response.data;
});

export const recipeSlice = createSlice({
  name: 'recipeSlice',
  initialState: {
    value: 0,
    entities: [],
    loading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    
    builder.addCase(getAllRecipesFromMongodb.pending,(state,action)=>{
      state.loading= true;
    });
    builder.addCase(getAllRecipesFromMongodb.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false
  });

  builder.addCase(getAllRecipesFromMongodb.rejected, (state, action) => {
    
    state.loading = false
});
  }
});

export default recipeSlice.reducer;
