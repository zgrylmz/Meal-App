import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import "../Css/ImageView.css";
import { useEffect, useState } from 'react';
import { getAllRecipesFromMongodb } from '../Redux/recipeSlice/recipeSlice';

function ImageView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { entities } = useSelector((store) => store.recipeSlice);
  const [recipe , SetRecipe] = useState();

useEffect(()=>{
    if(entities.length === 0){
        dispatch(getAllRecipesFromMongodb())
    }
    if(entities.length > 0){
        const imgRecipe = entities.find((item)=>item._id === id);
        SetRecipe(imgRecipe);
    }
},[dispatch,entities,id])

  if (!recipe) return <div>Loading...</div>;

  const imgSrc = `data:image/png;base64,${recipe.thumbnail}`;

  return (
    <div className="image-view-wrapper">
      <img src={imgSrc} alt="Full View" className="full-image" onClick={() => navigate(-1)} />
      <p className="back-hint">Click anywhere to go back</p>
    </div>
  );
}

export default ImageView;
