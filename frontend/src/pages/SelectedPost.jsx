import { useState, useEffect } from "react";
import api from "../api";
import Comment from "../components/Comment";

function SelectedPost() {
  // function SelectedPost({ post, onDelete }) {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US");

  useEffect(() => {
    // getComments();
  }, []);

  const getComments = () => {
    api
      .get("/api/comments/")
      .then((res) => res.data)
      .then((data) => setComments(data))
      .catch((err) => alert(err));
  };

  const deleteComment = (id) => {
    api
      .delete(`/api/comments/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Comment deleted!");
        else alert("Failed tp delete comment.");
        getComments();
      })
      .catch((err) => alert(err));
  };

  const createComment = (e) => {
    e.preventDefault();
    api
      .post("/api/comments/", { comment: comment, p_id: post.id })
      .then((res) => {
        if (res.status === 201) alert("Comment created!");
        else alert("Failed to make comment.");
        getComments();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>Image Goes Here</div>
      <div>
        <p>{post.title}</p>
        <p>{post.content}</p>
        <p>{formattedDate}</p>
        <button onClick={() => onDelete(post.id)}>Delete</button>
      </div>
      <h2>Create a Comment</h2>
      <form onSubmit={createComment}>
        <label htmlFor="content">Write your comment:</label>
        <br />
        <textarea
          id="comment"
          name="comment"
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
      <br />
      <div>
        <h2>Comments</h2>
        {comments.map((comment) => (
          <Comment
            comment={comment}
            onDelete={deleteComment}
            key={comment.id}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedPost;
