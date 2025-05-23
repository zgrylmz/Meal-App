import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logoutUser } from "../Redux/recipeSlice/authSlice";
import "../Css/header.css";
import Avatar from '@mui/material/Avatar';
import { IoIosHome } from "react-icons/io";
import { deepPurple } from '@mui/material/colors';
import { ImSpoonKnife } from "react-icons/im";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { inputForSearch } from '../Redux/recipeSlice/recipeSlice';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="custom-header">
      <div className="header-left" onClick={() => navigate("/")}>
      <ImSpoonKnife /> <span className="brand-name">MealApp</span>
      </div>

  {
    location.pathname === "/Recipes" ?  <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '45ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label="Search a recipe" variant="standard" onChange={(e)=>dispatch(inputForSearch(e.target.value))}/>
    </Box> : ""
  }

      <div className="header-right">
        {user ? (
          <>
            <Avatar sx={{ bgcolor: deepPurple[500] }} title={user.name}>
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <button onClick={handleLogout} className="header-btn">Logout</button>
            <button onClick={() => navigate("/")} className="header-btn">
              <IoIosHome />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="header-btn">Sign in</button>
            <button onClick={() => navigate("/sign")} className="header-btn primary">Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
