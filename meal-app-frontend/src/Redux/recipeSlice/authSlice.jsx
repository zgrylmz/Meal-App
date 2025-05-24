import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// // ✅ Check if user is authenticated (runs on page load)
// export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
//     try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/currentUser`, { withCredentials: true });

//         localStorage.setItem("user",JSON.stringify(response.data.user));
//         return response.data.user ; // ✅ Ensures we return only the user object
//     } catch (error) {
//         console.error("checkAuth Error:", error.message); // ✅ Debugging
//         return null; // ✅ Rejects the request safely
//     }
// });



// ✅ Logout user (clears Redux state & cookies)
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("user"); // ✅ Remove user from local storage
    localStorage.removeItem("userId");
    // localStorage.removeItem("jwt");
    return response.data;
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
         user: JSON.parse(localStorage.getItem("user")) || null,
         redirectUrl:""
        
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Persist user in localStorage
        }
    },
    extraReducers: (builder) => {
      
            
            builder.addCase(logoutUser.fulfilled, (state,action) => {
                state.user = null; // Clears user from Redux
                state.redirectUrl = action.payload;

            });
    }
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
