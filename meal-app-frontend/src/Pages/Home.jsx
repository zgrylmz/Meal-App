import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router';
import RecipesWithIngredient from './RecipesWithIngredient';
import { useState } from 'react';

const data = [
  {
    src: 'https://www.themealdb.com/images/ingredients/onions.png',
    title: 'Onion',
    description: '4.21M views',
  },
  {
    src: 'https://www.themealdb.com/images/ingredients/beef.png',
    title: 'Beef',
    description: '4.74M views',
  },
  {
    src: 'https://www.themealdb.com/images/ingredients/carrots.png',
    title: 'Carrot',
    description: '4.74M views',
  },
  {
    src: '  https://www.themealdb.com/images/ingredients/ginger.png',
    title: 'Ginger',
    description: '4.74M views',
  },
  {
    src: 'https://www.themealdb.com/images/ingredients/mushrooms.png',
    title: 'Mushrooms',
    description: '4.74M views',
  },
  {
    src: 'https://www.themealdb.com/images/ingredients/chicken%20breasts.png',
    title: 'Chicken breasts',
    description: '4.74M views',
  },
  {
    src: 'https://www.themealdb.com/images/ingredients/strawberries.png',
    title: 'Strawberries',
    description: '4.74M views',
  },
  {
    src: 'https://www.themealdb.com/images/ingredients/potatoes.png',
    title: 'Potatoes',
    description: '4.74M views',
  }


];

// const initialArtists = [
//   {id:1,name:"name1"},
//   {id:2,name:"name2"},
//   {id:3,name:"name3"}
// ]

export default function Home() {
  const navigate = useNavigate();
  // const [arr1, setArr1] = useState(initialArtists);
  const redirectionToThePage =(ingredientName)=>{
    navigate("/Recipes-with-ingredient",{state:{info: ingredientName}});
  }

  
  // console.log(arr1)


  return (
    <>
  
    <h1>ingredients</h1>
    <h3>Recipes with the ingredient you selected will be displayed.</h3>
    
   {
     // arr1.map((item)=>(
       // <>
        //<div style={{color:"black",fontFamily:"fantasy"}}>{item.name}</div>
        //</><button onClick={()=>setArr1(arr1.filter((data)=>data.id!=item.id))}>delete</button>
        //</>
      //))
    } 
   
   
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 3,
      }}
    >
      {data.map((item) => (
        <Card
          key={item.title}
          variant="outlined"
          sx={{ width: 250, flexDirection: 'column' }}
          
        >
          <AspectRatio minHeight="200px" style={{cursor:"pointer"}}>
            <img 
            
              srcSet={`${item.src}?w=300&h=200&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?w=300&h=200&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              onClick={()=>redirectionToThePage(item.title)}
              
            />
          </AspectRatio>
          <CardContent>
            <Typography level="title-md" fontWeight="lg">
              {item.title}
            </Typography>
            <Typography level="body-sm" textColor="text.secondary">
              
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
    </>
  );
}
