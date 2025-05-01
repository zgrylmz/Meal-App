import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getOneSingleRecipe } from '../Redux/recipeSlice/recipeSlice';
import { CiHeart } from "react-icons/ci";
import { FcLike } from "react-icons/fc";
import "../Css/RecipeDetails.css";
import { addFavoriteRecipes, callFavoriteRecipes, removeFromFavoriteRecipes } from '../Redux/recipeSlice/addFavoriteRecipes';
import { FaBackward } from "react-icons/fa6";
import { deleteComment, saveComment, updateComment } from '../Redux/recipeSlice/commentSlice';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import { deepPurple } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { formatDistanceToNow } from 'date-fns';

function ProductDetails() {
  const { oneRecipe } = useSelector((store) => store.recipeSlice);
  const { favoriteRecipe } = useSelector((store) => store.favoriteRecipes);
  const { user } = useSelector((store) => store.auth);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [textAreaValue, SetTextAreaValue] = useState();
  const [edit, SetEdit] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const localStorageuserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      if (!oneRecipe?._id || oneRecipe._id !== id) {
        await dispatch(getOneSingleRecipe({ id })).unwrap();
      }
      if (!favoriteRecipe) {
        await dispatch(callFavoriteRecipes({ userId: localStorageuserId })).unwrap();
      }
    };
    fetchData();
  }, [dispatch, id, oneRecipe?._id, favoriteRecipe, localStorageuserId]);

  useEffect(() => {
    if (oneRecipe && favoriteRecipe?.favorites) {
      const isFav = favoriteRecipe.favorites.includes(oneRecipe.name);
      setFavorite(isFav);
    }
  }, [oneRecipe, favoriteRecipe]);

  if (!oneRecipe?._id || !favoriteRecipe) return <h2>Loading...</h2>;

  const addToFavorites = async () => {
    try {
      await dispatch(addFavoriteRecipes({ userId: user.id, favoriteItem: oneRecipe.name })).unwrap();
      await dispatch(callFavoriteRecipes({ userId: localStorageuserId })).unwrap();
      setFavorite(true);
    } catch (err) {
      console.error("Add to favorite error:", err);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await dispatch(removeFromFavoriteRecipes({ userId: user.id, favoriteItem: oneRecipe.name })).unwrap();
      await dispatch(callFavoriteRecipes({ userId: localStorageuserId })).unwrap();
      setFavorite(false);
    } catch (error) {
      console.error("Remove from favorite error:", error);
    }
  };

  const sendComment = () => {
    dispatch(saveComment({
      recipeName: oneRecipe.name,
      comment: textAreaValue,
      id,
      userId: localStorageuserId,
      emailOfTheUser: user.email,
      nameOfTheUser: user.name,
    })).then(() => {
      SetTextAreaValue("");
    }).catch(err => console.error("Comment save error:", err));
    location.reload();
  };

  const deleteActiv = (a, b, c) => {
    dispatch(deleteComment({ id: a, commentId: b, userId: c }))
      .then(() => location.reload())
      .catch(err => console.error("Comment delete error:", err));
  };

  const updateActiv = (commentId, oldCommentText) => {
    SetTextAreaValue(oldCommentText);
    SetEdit(true);
    setEditingCommentId(commentId);
  };

  const updateSend = () => {
    dispatch(updateComment({
      id,
      commentId: editingCommentId,
      newComment: textAreaValue,
      userId: localStorageuserId,
    })).then(() => location.reload());
  };

  const img1 = `data:image/png;base64,${oneRecipe.thumbnail}`;

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className='cookTime'><p>{oneRecipe.cookTime} Min.</p></div>
        <div>
          <img src={img1} className='recipe-detail' onClick={() => navigate("/imageview/" + oneRecipe._id)} style={{ cursor: "pointer" }} title='Zoom the thumbnail' />
          {favorite ? (
            <FcLike className='fav-button' onClick={removeFromFavorites} title='Remove recipe' />
          ) : (
            <CiHeart className='fav-button' onClick={addToFavorites} title='Add recipe' />
          )}
        </div>
        <div>
          <p className='recipe-name'>{oneRecipe.name}</p>
          {oneRecipe.ingredients.map((ingredient, id) => (
            <div key={id} className='recipe-ingredient'>{ingredient}</div>
          ))}
          <div className='recipe-instructions'>Instructions: {oneRecipe.instructions}</div>
        </div>
      </div>

      <FaBackward style={{ fontSize: "xxx-large", cursor: "pointer" }} title='Go recipes' onClick={() => navigate("/Recipes")} />

      <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto">
        {oneRecipe.comments?.map((c, i) => {
          const isMyComment = c.IdOfTheuser === localStorageuserId;
          return (
            <div key={c._id} className="flex gap-4">
              <Avatar sx={{ bgcolor: deepPurple[500] }} title={c.nameOfTheUser}>
                {c.nameOfTheUser.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <p className="font-semibold">
                  <strong>{c.nameOfTheUser.substring(0, 1).toUpperCase() + c.nameOfTheUser.substring(1, 5)}</strong>
                  <span className="text-gray-500 text-sm"> {c.createdAt ? formatDistanceToNow(new Date(c.createdAt)) + " Ago" : ""}</span>
                </p>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{c.comment}</p>
                {isMyComment && (
                  <>
                    <MdDeleteForever style={{ cursor: "pointer", fontSize: "large" }} onClick={() => deleteActiv(id, c._id, localStorageuserId)} />
                    <MdOutlineUpdate style={{ cursor: "pointer", fontSize: "large", marginLeft: "10px" }} onClick={() => updateActiv(c._id, c.comment)} />
                  </>
                )}
              </div>
            </div>
          );
        })}

        <div className="comments-section" style={{ display: "flex", alignItems: "flex-end", justifyContent: "left", marginBottom: "10px" }}>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Send your comment"
            style={{ width: 400, height: 30 }}
            onChange={(e) => SetTextAreaValue(e.target.value)}
            value={textAreaValue}
          />
          {edit ? (
            <Button variant="contained" onClick={updateSend} endIcon={<SendIcon />}>Update</Button>
          ) : (
            <Button variant="contained" onClick={sendComment} endIcon={<SendIcon />}>Send</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
