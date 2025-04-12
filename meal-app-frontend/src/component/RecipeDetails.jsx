import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getAllRecipesFromMongodb } from '../Redux/recipeSlice/recipeSlice';
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import "../Css/RecipeDetails.css"
import { addFavoriteRecipes, callFavoriteRecipes, removeFromFavoriteRecipes } from '../Redux/recipeSlice/addFavoriteRecipes';
import { FaBackward } from "react-icons/fa6";
import { deleteComment, saveComment } from '../Redux/recipeSlice/commentSlice';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { MdDeleteForever } from "react-icons/md";

function ProductDetails() {
  const { entities } = useSelector((store) => store.recipeSlice);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [recipeDetail, setRecipeDetail] = useState(null);
  const { favoriteRecipe } = useSelector((store) => store.favoriteRecipes);
  const [favorite, setFavorite] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [textAreaValue, SetTextAreaValue] = useState();


  const localStorageuserId = localStorage.getItem("userId")

  useEffect(() => {

    const localStorageuserId = localStorage.getItem("userId")

    if (entities.length === 0) {
      dispatch(getAllRecipesFromMongodb());
    }
    if (entities.length > 0) {
      const foundRecipe = entities.find((recipe) => recipe._id === id);
      setRecipeDetail(foundRecipe);
    }
    if (favoriteRecipe === null) {
      dispatch(callFavoriteRecipes({ userId: localStorageuserId }))
    }


  }, [dispatch, entities.length, entities, id, favoriteRecipe, localStorageuserId]);


  useEffect(() => {
    if (recipeDetail && favoriteRecipe) {
      const isFavorite = favoriteRecipe.favorites.includes(recipeDetail.name);
      setFavorite(isFavorite); // ✅ Update state ONCE
    }
  }, [recipeDetail, favoriteRecipe]);


  if (!recipeDetail || !favoriteRecipe) {
    return <h2>Loading...</h2>;
  }


  const addToFavorites = () => {
    setFavorite(true);
    dispatch(addFavoriteRecipes({ userId: user.id, favoriteItem: recipeDetail.name }));
    dispatch(callFavoriteRecipes({ userId: localStorageuserId }))

  };

  const removeFromFavorites = () => {
    setFavorite(false);
    dispatch(removeFromFavoriteRecipes({ userId: user.id, favoriteItem: recipeDetail.name }));
    dispatch(callFavoriteRecipes({ userId: localStorageuserId }));
  }

  const sendComment = () => {
    dispatch(saveComment({ recipeName: recipeDetail.name, comment: textAreaValue, id, userId: localStorageuserId }))
      .then(() => {
        // Update the comments in local state
        const updateRecipeDetail = { ...recipeDetail, comments: [...recipeDetail.comments, { comment: textAreaValue }] };
        setRecipeDetail(updateRecipeDetail);
        SetTextAreaValue("");
      })
      .catch((err) => {
        console.error("Error saving comment:", err);
      });
  };

  const deleteActiv = (a,b) =>{
    dispatch(deleteComment({id:a,comment:b}))
    .then(()=>{
      
      const newRecipeDetailAfterDelete = recipeDetail.comments.filter((r)=>r.comment !==b)
      const newRecipeDetailAfterFiltered = {...recipeDetail,comments:newRecipeDetailAfterDelete}
      setRecipeDetail(newRecipeDetailAfterFiltered);

    }).catch((err)=>{
      console.error(err);
    })
  }

  const img1 = `data:image/png;base64,${recipeDetail.thumbnail}`;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className='cookTime'>
          <p>{recipeDetail.cookTime} Min.</p>
        </div>
        <div>
          <img
            src={img1} className='recipe-detail'
            onClick={() => navigate("/imageview/"+recipeDetail._id)}
            style={{ cursor: "pointer" }} title='Zoom the thumbnail' />
          {
            favorite ? (
              <FcLike className='fav-button' onClick={removeFromFavorites} title='Remove recipe' />
            ) : (
              <CiHeart className='fav-button' onClick={addToFavorites} title='Add recipe' />
            )
          }
        </div>
        <div>
          <p className='recipe-name'>{recipeDetail.name}</p>
          {recipeDetail.ingredients.map((ingredient, id) => (
            <div key={id} className='recipe-ingredient'>{ingredient}</div>
          ))}
          <div className='recipe-instructions'>Instructions: {recipeDetail.instructions}</div>

        </div>

      </div>
      <FaBackward style={{ fontSize: "xxx-large", cursor: "pointer" }} title='Go recipes' onClick={() => navigate("/Recipes")} />

      <div className="comments-section">
        <h3>Comments</h3>
        {recipeDetail.comments.map((c, i) => (
          
          <div key={i} className="flex-category" style={{gap:"20px"}}>

            <strong>{user.email}:</strong><div>{c.comment}</div><div>{c.createdAt}</div>
            <div><MdDeleteForever style={{cursor:"pointer",fontSize:"xx-large"}} onClick={()=>deleteActiv(id,c.comment)}/></div>
          </div>
          
        ))}
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Minimum 3 rows"
          style={{ width: 400, height: 30 }}
          onChange={(e) => SetTextAreaValue(e.target.value)} value={textAreaValue}
        />
        {/* <textarea placeholder="Write your comment..." /> */}
        <button onClick={sendComment}>Post Comment</button>
      </div>

    </div>
  );
}

export default ProductDetails;
