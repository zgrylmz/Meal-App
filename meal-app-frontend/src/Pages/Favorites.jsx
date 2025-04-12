import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFavoriteRecipes, setUserId } from '../Redux/recipeSlice/addFavoriteRecipes';
import { useNavigate } from 'react-router';
import { getAllRecipesFromMongodb } from '../Redux/recipeSlice/recipeSlice';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import AnimatedLoader from '../component/AnimatedLoader';

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, favoriteRecipe } = useSelector((store) => store.favoriteRecipes);
  const {entities} = useSelector((store)=>store.recipeSlice);
  const { user } = useSelector((store) => store.auth);
  const [filteredFavorites , setFilteredFavorites] = useState([]);


  useEffect(() => {
    let storedUserId = localStorage.getItem("userId"); // ✅ Retrieve from local storage

    if (!userId && storedUserId) {
      dispatch(setUserId(storedUserId)); // ✅ Set userId in Redux
      dispatch(callFavoriteRecipes({ userId:storedUserId })); // ✅ Fetch favorites only when userId exists
    } else if (userId) {
      dispatch(callFavoriteRecipes({ userId:userId })); // ✅ Fetch only when userId is set
    }
  }, [userId, dispatch]);


  useEffect(()=>{
      
    if(entities.length === 0){
      dispatch(getAllRecipesFromMongodb());
    }else if (entities.length>0 &&  favoriteRecipe?.favorites){
        // const favoriteRecipesFiltered = entities((ent)=>ent. == )
        const favoriteRecipesFiltered  = entities.filter((item)=>favoriteRecipe.favorites.includes(item.name))
        setFilteredFavorites(favoriteRecipesFiltered)
    }
    
  },[entities,dispatch,favoriteRecipe])

  console.log(filteredFavorites)

  // ✅ Prevent error by checking if `favoriteRecipe` exists
  if (!favoriteRecipe || !favoriteRecipe.favorites || !filteredFavorites) {
    return <p>Loading...</p>;
  }

  // const img = ;

  return (
    
    <div className='recipes-container'>
    
      {user ? (
        favoriteRecipe.favorites.length > 0 ? (
         
       filteredFavorites.map((recipe,index)=>(
        <div key={index}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" src={`data:image/png;base64,${recipe.thumbnail}`} alt="Recipe Image" />
          <CardContent>
            <Typography display={'flex'} variant="h5" component="div">
              {recipe.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', height: "100px" }}>
              {recipe.instructions}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={() => navigate("/recipe-details/" + recipe._id)}>
            Details
          </Button>
        </CardActions>
      </Card>
    </div>
       ))) : (
          <p>No favorite recipes yet!</p>
        )
      ) : (
        navigate("/login")
      )}
    </div>
  );
}

export default Favorites;
