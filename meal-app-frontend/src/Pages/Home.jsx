import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Box from '@mui/joy/Box';

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
    title: 'Strawberries',
    description: '4.74M views',
  }


];

export default function Home() {
  return (
    <>
    <h1>ingredients</h1>
    <h3>Recipes with the products you selected will be displayed.</h3>
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
          sx={{ width: 300, flexDirection: 'column' }}
          
        >
          <AspectRatio minHeight="200px" style={{cursor:"pointer"}}>
            <img 
            
              srcSet={`${item.src}?w=300&h=200&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?w=300&h=200&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
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
