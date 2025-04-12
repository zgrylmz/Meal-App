import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Sign from '../Pages/Sign';
import ProductList from '../component/ProductList';
import ProductDetails from '../component/RecipeDetails';
import Videos from '../Pages/Videos';
import FertigMenüs from '../Pages/FertigMenüs';
import Favorites from '../Pages/Favorites';
import RandomRezept from '../Pages/RandomRezept'
import ImageView from '../component/ImageView';
// import { checkAuth } from "../Redux/recipeSlice/authSlice";

function Routers() {

  const { user } = useSelector((store) => store.auth);
  
  // useEffect(() => {
  //   dispatch(checkAuth()); // Re-check authentication when app loads
  // }, [dispatch]);

  // if (user === undefined) return <p>Loading...</p>; //  Prevents redirect before Redux updates

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/" element={<Home />}/>
      <Route path="/Recipes" element={user ? <ProductList /> : <Navigate to="/login" />}/> 
      <Route path="/Videos" element={<Videos/>}/>
      <Route path="/fertig" element={<FertigMenüs/>}/>
      {/* <Route path='/random-recipes' element={<RandomRezept/>}/> */}
      <Route path='favorit-recipes' element={user ? <Favorites/> : <Navigate to="/login"/>}/>
      <Route path="/imageview/:id" element={<ImageView />} />
      
      
      
      {/* Bu üst kisimdaki ekstra önlem söyleki middleware i sildigin zaman bu kisim ekstra koruma gibi düsün f12 application kismindan uydurma user ve value uydurursan yine de icerigi görebilirsin ama bu  middleware i silersen ortaya cikar aklinda bulunsun  */}
      <Route path="/recipe-details/:id" element={<ProductDetails />} />
    </Routes>
  );
}

export default Routers;
