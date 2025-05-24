import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipesByIngredient } from '../Redux/recipeSlice/ingredientSlice';
import { useLocation, useNavigate } from 'react-router';
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
import "../Css/RecipesWithIngredient.css"

export default function RecipesWithIngredient() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const expensiveData = useRef(null);
    const [recipeWithIngredient , setRecipeWithIngredient] = useState([]);
    const { state } = useLocation();
    const ingredientName = state?.info;
    // const [ingredientArr , setIngredientArr] = useState([]);
    

  useEffect(()=>{
    const fetchData = async()=>{
      if(!expensiveData.current){
        // setIngredientArr.push(ingredientName.toLowerCase());
        const data = await dispatch(getRecipesByIngredient({ingredientName:[ingredientName.toLowerCase()]})).unwrap();
        expensiveData.current = data;
        setRecipeWithIngredient(data);
      }else{
        setRecipeWithIngredient(expensiveData.current);
      }
    }
   fetchData();
  },[dispatch,ingredientName])

// console.log(ingredientArr);
console.log(recipeWithIngredient)

// const img = `data:image/png;base64,${ingredientName.thumbnail}`;
  return (
      <div className='recipeWithIngredient'>
      {
        recipeWithIngredient.map((item,i)=>{
          return(
            
            <Card sx={{ maxWidth: 345 }} key={i} >
              <CardActionArea>
                <CardMedia component="img" height="120" src={`data:image/png;base64,${item.thumbnail}`} alt="Recipe Image" />
                <CardContent>
                  <Typography display={'flex'} variant="h5" component="div" style={{ height: "80px" }}>
                    {item.name}
                  </Typography>
             
                  <Typography>
    
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions style={{ display: "flex", "flexDirection": "row", justifyContent: "space-between", alignItems: "center" }} >
                <Button size="small" color="primary" onClick={() => navigate("/recipe-details/" + item._id)}>
                  Details
                </Button>
                <Stack spacing={1}>
                  <Rating name="half-rating" defaultValue={item.rating/item.numberOfRating} precision={0.5} onChange={(e) => dispatch(setRatingsOfRecipes({ rating: Number(e.target.value), userId: storedUserId, recipeName: name, numberOfRating: 1, id: recipe._id }))} />
                </Stack>
              </CardActions>
          
            </Card>
    
    
          
          )
      })
      }
    
        </div>
        
  )
}
