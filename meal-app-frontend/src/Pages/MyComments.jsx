import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callComents } from '../Redux/recipeSlice/commentSlice';
import { formatDistanceToNow } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';

export default function MyComments() {
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.favoriteRecipes);
  const { comments } = useSelector((store) => store.CommentSlice);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const callAllComents = async () => {
      try {
        if (userId) {
          await dispatch(callComents( userId )).unwrap();
        } else if (storedUserId) {
          await dispatch(callComents({ userId: storedUserId })).unwrap();
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    callAllComents();
  }, [userId, dispatch]);

  return (
    <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto"}}>
      {comments?.commentsOfUser?.map((recipe, i) => (
        <div
          key={i}
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            marginBottom: "1.5rem",
            padding: "1rem 1.5rem",
            fontFamily: "'Segoe UI', sans-serif"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px", justifyContent:"left" }}>
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: "10px" }}>
              {recipe.recipeName.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <strong style={{ fontSize: "1.1rem" }}>{recipe.recipeName}</strong>
              <div style={{ fontSize: "0.8rem", color: "#555" }}>
                {recipe.createdAt ? formatDistanceToNow(new Date(recipe.createdAt)) + " ago" : ""}
              </div>
            </div>
          </div>
          <p style={{ fontSize: "1rem", color: "#333", marginTop: "10px" }}>
            <strong style={{ color: "#444" }}>Comment:</strong> {recipe.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
