import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const saveComment = createAsyncThunk("saveComment",async({id,comment,userId,recipeName})=>{
    await axios.post(`${import.meta.env.VITE_API_URL}/saveComment`,
        {id,comment,userId,recipeName},
        {withCredentials:true}
        
    )

});

export const deleteComment = createAsyncThunk("deleteComment", async ({ id, comment }) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/deleteComment`, {
    data: { id, comment },
    withCredentials: true
  });
});


const counterSlice = createSlice({
  name: 'CommentSlice',
  initialState:{},
  reducers: {
 
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer