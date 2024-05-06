import { useState, useEffect } from "react";
import api from "../api";
import Comment from "../components/Comment";

function SelectedPost() {
  const [post, setPost] = useState("");
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getPost();
    getComments();
  }, []);

  const getPost = () => {
    api
      .get("/api/Post/")
      .then((res) => res.data)
      .then((data) => setPost(data))
      .catch((err) => alert(err));
  };
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
      .post("/api/comments/", { content, title })
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
      </div>
      <h2>Create a Comment</h2>
      <form onSubmit={{ createComment }}>
        <label htmlFor="comment">Write your comment:</label>
        <br />
        <textarea
          type="text"
          id="comment"
          name="comment"
          required
          value={comment}
          onchange={(e) => setComment(e.target.value)}
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
