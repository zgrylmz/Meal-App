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



function Recipes({ recipe }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let storedUserId = localStorage.getItem("userId");
  // const { user } = useSelector((store) => store.auth);
  const { name, ingredients, instructions } = recipe;

  const img = `data:image/png;base64,${recipe.thumbnail}`;


  const truncate = (instructionsString,maxLength)=>{
    if(instructionsString.length<maxLength)return instructionsString ;
    return `${instructionsString.substring(0,maxLength)}...`;

  }
  const totalScore = (recipe.rating/recipe.numberOfRating);
  
  console.log(recipe.rating);
  console.log(recipe.numberOfRating);
  // console.log(totalScore);
  

  return (
    <>
    
    <div >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" src={img} alt="Recipe Image" />
          <CardContent>
            <Typography display={'flex'} variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', height: "100px", width:"400px"}}>
              {truncate(instructions,150)}
            </Typography>
            <Typography>
                
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions style={{display:"flex","flexDirection":"row",justifyContent:"space-between",alignItems:"center"}} >
          <Button size="small" color="primary" onClick={() => navigate("/recipe-details/" + recipe._id)}>
            Details
          </Button>
            <Stack spacing={1}>
              <Rating name="half-rating" defaultValue={totalScore} precision={0.5} onChange={(e)=> dispatch(setRatingsOfRecipes({rating:Number(e.target.value),userId:storedUserId,recipeName:name,numberOfRating:1,id:recipe._id}))}/>
            </Stack>
        </CardActions>
      </Card>
    </div>
    </>
  );
}

export default Recipes;
