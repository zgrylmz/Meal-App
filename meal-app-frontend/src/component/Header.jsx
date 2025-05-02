import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../Redux/recipeSlice/authSlice";
import "../Css/header.css";
import Avatar from '@mui/material/Avatar';
import { IoIosHome } from "react-icons/io";
import { deepPurple } from '@mui/material/colors';
import { ImSpoonKnife } from "react-icons/im";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className="custom-header">
      <div className="header-left" onClick={() => navigate("/")}>
      <ImSpoonKnife /> <span className="brand-name">MealApp</span>
      </div>

      <nav className="header-nav">
        {/* Add these only if needed */}
        {/* <a href="#">Features</a>
        <a href="#">Recipes</a>
        <a href="#">Pricing</a> */}
      </nav>

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
