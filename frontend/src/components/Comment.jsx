import React from "react";
import "../styles/Note.css";

function Comment({ comment, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  return (
    <div>
      <p>{comment.author}</p>
      <p>{comment.content}</p>
      <p>{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(comment.id)}>
        Delete
      </button>
    </div>
  );
}

export default Comment;
