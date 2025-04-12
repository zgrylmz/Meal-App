import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { loginUser } from "../Redux/recipeSlice/authSlice";
import { callFavoriteRecipes, setUserId } from "../Redux/recipeSlice/addFavoriteRecipes";


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // const {idForFavorites} = useSelector((store)=>store.favoriteRecipes);
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long") // Minimum length
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase
        .matches(/[a-z]/, "Password must contain at least one lowercase letter"), // At least one lowercase
    }),
    onSubmit: async (values) => {
      try {
        // Send a POST request to the backend
        
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, values,{withCredentials:true});
          console.log(response);
       if(response.data.redirectUrl){
          dispatch(loginUser(response.data.user))
          dispatch(setUserId(response.data.user.id))
          // dispatch(callFavoriteRecipes({userId:response.data.user.id}));
          localStorage.setItem("userId", response.data.user.id); 
          navigate(response.data.redirectUrl);
        }else {
          console.error("Unexpected responsee:", response);
        }
      } catch (error) { 
       

        if (error.response && error.response.status === 401) {
            setErrorMessage(error.response.data.error); // Set the error message from backend
          } else {
            console.error("Something went wrong. Please try again.");
            // console.error("Unexpected error:", error.message); eger bu kismi kapatmazsan yukarda import.meta ile gizledigin url gözüküyor bir hata oldugu zaman
          }
      }
    },
  });

  return ( 
  <div className="login-page">
    <form onSubmit={handleSubmit} className="form-elements">
      <div className="login-div-tags">
        <label>Email:</label>
        <input
          name="email"
          type="text"
          placeholder="Enter an email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && <p>{errors.email}</p>}
      </div>
      <div className="login-div-tags">
        <label>Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Enter a Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && <p>{errors.password}</p>}
      </div>
      <Stack spacing={2} direction="row">
      
      <Button variant="contained" type="submit">Login</Button>
      <Button variant="outlined" type="submit">Forgot Password</Button>
    </Stack>
    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
    
  </div>


   
  );
}

export default Login;
