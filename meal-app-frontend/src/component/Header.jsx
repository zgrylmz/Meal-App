import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../Redux/recipeSlice/authSlice";
import "../Css/header.css"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IoIosHome } from "react-icons/io";
import { deepOrange, deepPurple } from '@mui/material/colors';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);


  const handleLogout = () => {
    dispatch(logoutUser());
  };


  return (
    <div>

      <div className='header'>
        <p style={{ marginRight: "75%" }}>
          The Meal App
        </p>
        {user ? (
          <>
            <Stack direction="row" spacing={1}>
              <Avatar sx={{ bgcolor: deepPurple[500] }} title={`${user.name}`}>{user.name.substring(0,1)}</Avatar>
            </Stack>
            {/* <span>Welcome, {user.name}</span> */}
            <button onClick={() => handleLogout()} className='headerIcon'>Logout</button>
            <button onClick={() => navigate("/")} className='headerIcon'><IoIosHome /></button>

          </>
        ) : (
          <>
            <button onClick={() => navigate("/")} className='headerIcon'><IoIosHome /></button>
            <button onClick={() => navigate("/login")} className='headerIcon'>Login</button>
            <button onClick={() => navigate("/sign")} className='headerIcon'>Sign up</button>

          </>
        )}
      </div>
    </div>

  );
}

export default Header;
