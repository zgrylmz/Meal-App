import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "../App.css"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { loginUser } from "../Redux/recipeSlice/authSlice";
import { setUserId } from "../Redux/recipeSlice/addFavoriteRecipes";



function Sign() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            age:"",
            email: "",
            password: "",
            confirm:"",
        },
        validationSchema: Yup.object({

            name: Yup.string()
            .required("Name is required"),
            age: Yup.number()
            .required("Age is required")
            .typeError("Age must be a number"),
            email: Yup.string()
                .email("Please enter a valid email")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters long") // Minimum length
                .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // At least one uppercase
                .matches(/[a-z]/, "Password must contain at least one lowercase letter"), // At least one lowercase
            confirm: Yup.string().required("confirm password is required")
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            

        }),
        onSubmit: async (values) => {
            try {
                // Send a POST request to the backend

                const response = await axios.post(`${import.meta.env.VITE_API_URL}/sign`, values,{withCredentials:true});

                	    console.log(response.data);
                // Handle redirection based on backend response
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                    dispatch(loginUser(response.data.user))
                    dispatch(setUserId(response.data.user.id))
                    // dispatch(callFavoriteRecipes({userId:response.data.user.id}));
                    localStorage.setItem("userId", response.data.user.id); 
                    // navigate(response.data.redirectUrl);
                } else {
                    console.error("Unexpected responsee:", response.data);
                }
            } catch (error) {
               

                if (error.response && error.response.status === 401) {
                    setErrorMessage(error.response.data.error); // Set the error message from backend
                } else {
                    console.error("Unexpected error:");
                }
            }
        },
    });

    return (
        <div className="sign-page">
            <form onSubmit={handleSubmit} className="form-elements">
                <div className="sign-div-tags">
                    <label>Name:</label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}

                    />
                    {errors.name && touched.name && <p style={{color:"red"}}>{errors.name}</p>}
                </div>
                <div className="sign-div-tags">
                    <label>Age:</label>
                    <input
                        name="age"
                        type="number"
                        placeholder="Age"
                        value={values.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.age && touched.age && <p style={{color:"red"}}>{errors.age}</p>}
                </div>
                <div className="sign-div-tags">
                    <label>Email:</label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Enter an email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <p style={{color:"red"}}>{errors.email}</p>}
                </div>
                <div className="sign-div-tags">
                    <label>Password:</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter a Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.password && touched.password && <p style={{color:"red"}}>{errors.password}</p>}
                </div>
                <div className="sign-div-tags">
                    <label>Password again:</label>
                    <input
                    name="confirm"
                    type="password"
                    placeholder="Password again"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                    {errors.confirm && touched.confirm && <p style={{color:"red"}}>{errors.confirm}</p>}
                </div>
                <Stack spacing={1} direction="row">
                    <Button variant="contained" type="submit">Register</Button>
                </Stack>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </div>
    );
}

export default Sign;
