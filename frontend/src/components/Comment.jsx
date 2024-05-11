import React from "react";
import "../styles/Comment.css";
import Grid from "@mui/material/Grid";

function Comment({ comment, onDelete }) {
  const formattedDate = new Date(comment.created_at).toLocaleDateString(
    "en-US"
  );
  return (
    <Grid container rowSpacing={2} className="grid">
      <Grid item xs={2} className="username-grid">
        <p className="username-id">{comment.author}</p>
      </Grid>
      <Grid item xs={10}>
        <p className="content-text">{comment.content}</p>
      </Grid>
      <Grid item xs={4} className="time-grid">
        <p className="time">Date Created: {formattedDate}</p>
      </Grid>
      <Grid item xs={8} className="button-grid">
        <button className="delete-button" onClick={() => onDelete(comment.id)}>
          Delete
        </button>
      </Grid>
    </Grid>
  );
}

export default Comment;
