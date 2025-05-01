import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import "../Css/ImageView.css";
import { useEffect, useState } from 'react';
import { getAllRecipesFromMongodb, getOneSingleRecipe } from '../Redux/recipeSlice/recipeSlice';

function ImageView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { entities,oneRecipe } = useSelector((store) => store.recipeSlice);
  const [recipe , SetRecipe] = useState();

useEffect(()=>{
      const callOneRecipe = async()=>{
        if(oneRecipe===null){
          await dispatch(getOneSingleRecipe({id})).unwrap();
        }
      }
      
  
  // if(entities.recipes.length === 0){
    //     dispatch(getAllRecipesFromMongodb())
    // }
    // if(entities.recipes.length > 0){
    //     const imgRecipe = entities.recipes.find((item)=>item._id === id);
    //     SetRecipe(imgRecipe);
    // }
    callOneRecipe();
},[dispatch,id,oneRecipe])

  // if (!oneRecipe) return <div>Loading...</div>;
  console.log(oneRecipe)

  const imgSrc = `data:image/png;base64,${oneRecipe?.thumbnail}`;

  return (
    <div className="image-view-wrapper">
      <img src={imgSrc} alt="Full View" className="full-image" onClick={() => navigate(-1)} />
      <p className="back-hint">Click anywhere to go back</p>
    </div>
  );
}

export default ImageView;
