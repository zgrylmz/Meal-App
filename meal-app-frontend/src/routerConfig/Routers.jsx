import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { useSelector, useDispatch } from "react-redux";
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Sign from '../Pages/Sign';
import ProductList from '../component/ProductList';
import ProductDetails from '../component/RecipeDetails';
import Videos from '../Pages/Videos';
import Favorites from '../Pages/Favorites';
import ImageView from '../component/ImageView';
import Upload from '../Pages/Upload';
import MyComments from '../Pages/MyComments';
import RecipesWithIngredient from '../Pages/RecipesWithIngredient';

function Routers() {

  const { user } = useSelector((store) => store.auth);
  


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign" element={<Sign />} />
      <Route path="/" element={<Home />}/>
      <Route path="/Recipes" element={user ? <ProductList /> : <Navigate to="/login" />}/> 
      <Route path="/Videos" element={<Videos/>}/>
      <Route path="/show-my-comments" element={<MyComments/>}/>
      {/* <Route path="/fertig" element={<FertigMenüs/>}/>  */}
      <Route path='favorit-recipes' element={user ? <Favorites/> : <Navigate to="/login"/>}/>
      <Route path="/imageview/:id" element={<ImageView />} />
      <Route path='/addYourRecipe' element={user ? <Upload/> : <Navigate to="/login"/> }/> 
      {/* Bu üst kisimdaki ekstra önlem söyleki middleware i sildigin zaman bu kisim ekstra koruma gibi düsün f12 application kismindan uydurma user ve value uydurursan yine de icerigi görebilirsin ama bu  middleware i silersen ortaya cikar aklinda bulunsun  */}
      <Route path="/recipe-details/:id" element={user ? <ProductDetails/> : <Navigate to="login"/>} />
      <Route path='/Recipes-with-ingredient' element={<RecipesWithIngredient/>} />
      
    </Routes>
  );
}

export default Routers;
