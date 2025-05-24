import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllRecipesFromMongodb = createAsyncThunk("getRecipes", async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/Recipes`, { withCredentials: true }); // ✅ Ensures JWT is sent
    return response.data;
});


export const getOneSingleRecipe = createAsyncThunk("getOneSingleRecipe",async({id})=>{
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/getOneSingleRecipe/${id}`,
  {withCredentials:true});
  return response.data;
})

export const getRecipesPagination = createAsyncThunk("getRecipesPagination",async({Page})=>{
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/getAllRecipesPegination/${Page}?limit=8`,
    {withCredentials:true});
    return response.data;
});

export const deleteOneRecipe = createAsyncThunk("deleteOneRecipe",async({recipeId})=>{
  await axios.delete(`${import.meta.env.VITE_API_URL}/deleteOneRecipe`,{
    data:{recipeId},
    withCredentials:true
  });
});

export const recipeSlice = createSlice({
  name: 'recipeSlice',
  initialState: {
    entities: [],
    loading:false,
    oneRecipe:null,
    input:null,
  },
  reducers: {
    inputForSearch:(state,action)=>{
      state.input = action.payload;
    }
  },
  extraReducers: (builder) => {
    
    builder.addCase(getRecipesPagination.pending,(state,action)=>{
      state.loading= true;
    });
    builder.addCase(getRecipesPagination.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.loading = false;
  });

  builder.addCase(getRecipesPagination.rejected, (state, action) => {
    
    state.loading = false
  });

  builder.addCase(getOneSingleRecipe.fulfilled,(state,action)=>{
    state.oneRecipe = action.payload;
  });
  }
});

export const { inputForSearch } = recipeSlice.actions;
export default recipeSlice.reducer;
