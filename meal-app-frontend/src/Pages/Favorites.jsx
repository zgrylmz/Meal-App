import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  callFavoriteRecipes,
  getFavoritRecipesWithContent,
  setUserId,
} from '../Redux/recipeSlice/addFavoriteRecipes';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, favoriteRecipe, favoriteRecipesWithContent } = useSelector(
    (store) => store.favoriteRecipes
  );
  const { user } = useSelector((store) => store.auth);
  const storedUserId = localStorage.getItem('userId');
  // const [refreshFavorites, setRefreshFavorites] = useState(false); // 🆕 Track changes

  // Step 1: Fetch favorite recipe names
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!userId && storedUserId) {
          dispatch(setUserId(storedUserId));
          await dispatch(callFavoriteRecipes({ userId: storedUserId }));
        } else if (userId) {
          await dispatch(callFavoriteRecipes({ userId }));
        }
      } catch (err) {
        console.error('Error loading favorites:', err);
      }
    };

    fetchFavorites();
  }, [dispatch, userId, storedUserId]); // ✅ re-run if refreshed

  // Step 2: Fetch full recipe data by name
  useEffect(() => {
    const fetchRecipes = async () => {
     
      if (favoriteRecipe?.favorites?.length > 0) {
        try {
          await dispatch(getFavoritRecipesWithContent({recipeName: favoriteRecipe.favorites,})
          );
        } catch (err) {
          console.error('Error fetching full recipes:', err);
        }
      }
      
    };

    fetchRecipes();
  }, [dispatch, favoriteRecipe]);

  const truncateInstructions = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  if (!user) {
    navigate('/login');
    return null;
  }


  return (
    <div className="recipes-container">
      {favoriteRecipesWithContent && favoriteRecipesWithContent.length > 0 ? (
        favoriteRecipesWithContent.map((recipe, index) => (
          <div key={index}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  src={`data:image/png;base64,${recipe.thumbnail}`}
                  alt="Recipe"
                />
                <CardContent>
                  <Typography variant="h5" component="div" style={{ height: '80px' }}>
                    {recipe.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', height: '100px' }}
                  >
                    {truncateInstructions(recipe.instructions, 150)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/recipe-details/${recipe._id}`)}
                >
                  Details
                </Button>
                {/* You could even add "Remove from Favorites" button here later and call `triggerRefresh()` after */}
              </CardActions>
            </Card>
          </div>
        ))
      ) : (
        <p style={{ textAlign: 'center' }}>No favorite recipes yet!</p>
      )}
    </div>
  );
}

export default Favorites;
