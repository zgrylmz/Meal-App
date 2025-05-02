import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const saveComment = createAsyncThunk(
  "saveComment",
  async ({ id, comment, userId, recipeName,emailOfTheUser,nameOfTheUser }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/saveComment`,
      { id, comment, userId, recipeName,emailOfTheUser,nameOfTheUser },
      { withCredentials: true }
    );
    return response.data; // ✅ should be array of updated comments
  }
);


export const deleteComment = createAsyncThunk("deleteComment", async ({ id, commentId,userId }) => {
  const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteComment`, {
    data: { id, commentId,userId },
    withCredentials: true
  });

  return response.data;
});

export const updateComment = createAsyncThunk("updateComment", async ({ id, commentId, newComment,userId }) => {
  const response = await axios.put(`${import.meta.env.VITE_API_URL}/updateComment`, {
    id,
    commentId,
    newComment,
    userId
  }, {
    withCredentials: true
  });

  return response.data;
});

export const callComents = createAsyncThunk("callComents",async({userId})=>{
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/getComments`,{userId},{withCredentials:true});
 return response.data;

});






const counterSlice = createSlice({
  name: 'CommentSlice',
  initialState:{
    comments:[]
  },
  reducers: {
 
  },
  extraReducers:(builder)=>{
    builder.addCase(callComents.fulfilled,(state,action)=>{
      state.comments = action.payload;
    })
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer