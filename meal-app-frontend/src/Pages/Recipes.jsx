import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { setRatingsOfRecipes } from '../Redux/recipeSlice/rankingSlice';
import { deleteOneRecipe } from '../Redux/recipeSlice/recipeSlice';
import { useEffect } from 'react';
import { useState } from 'react';



function Recipes({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  let storedUserId = localStorage.getItem("userId");
  // const { user } = useSelector((store) => store.auth);
  const { name, ingredients, instructions, createdBy,rating,numberOfRating } = recipe;

  const img = `data:image/png;base64,${recipe.thumbnail}`;

  
    // const totalScore = (rating / numberOfRating);
 
 


  const truncate = (instructionsString, maxLength) => {
    if (instructionsString.length < maxLength) return instructionsString;
    return `${instructionsString.substring(0, maxLength)}...`;

  }


  // console.log(recipe.rating);
  // console.log(recipe.numberOfRating);
  // console.log(totalScore);


  const showIdOfRecipe = async (recipeId) => {
    try {
      await dispatch(deleteOneRecipe({ recipeId })).unwrap(); // wait for deletion
      navigate("/Recipes"); // then navigate
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  return (

    <>

      <div >
        <Card sx={{ maxWidth: 345 }} >
          <CardActionArea>
            <CardMedia component="img" height="120" src={img} alt="Recipe Image" />
            <CardContent>
              <Typography display={'flex'} variant="h5" component="div" style={{ height: "80px" }}>
                {name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', height: "120px", width: "400px" }}>
                {truncate(instructions, 150)}
              </Typography>
              <Typography>

              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions style={{ display: "flex", "flexDirection": "row", justifyContent: "space-between", alignItems: "center" }} >
            <Button size="small" color="primary" onClick={() => navigate("/recipe-details/" + recipe._id)}>
              Details
            </Button>
            <Stack spacing={1}>
              <Rating name="half-rating" value={rating > 0 ? rating/numberOfRating : 0} precision={0.5} onChange={(e) => dispatch(setRatingsOfRecipes({ rating: Number(e.target.value), userId: storedUserId, recipeName: name, numberOfRating: 1, id: recipe._id }))} />
            </Stack>
          </CardActions>
          {
            createdBy?.map((c,i)=>{
              const isMyRecipe = c.IdOfTheUser === storedUserId;
                
              return(
                
               <>
              {
                isMyRecipe &&(
                 <>
                 
                 <button onClick={() => showIdOfRecipe(recipe._id)}>Delete</button>
                 <p className="text-gray-700 mt-1 whitespace-pre-line">{c.comment}</p>
                 </>
                )
              }
               </>
                
              )
            })
          }
        </Card>


      </div>

    </>


  );
}

export default Recipes;
