import { useState, useEffect } from "react";
import api from "../api";
import Comment from "../components/Comment";
import Grid from "@mui/material/Grid";
import "../styles/SelectedPost.css";
import { Box } from "@mui/material";
import image from "../assets/eggs.jpg";

function SelectedPost_demo() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const formattedDate = new Date(comment.created_at).toLocaleDateString(
    "en-US"
  );
  const post = {
    title: "Stir-fried tomato and scrambled eggs",
    content: `Ingredients: 
    
    4 large eggs 
    2 medium-sized ripe tomatoes
    2 cloves of garlic, minced
    1 tablespoon vegetable oil
    1 teaspoon soy sauce
    1/2 teaspoon sugar
    Salt and pepper to taste
    Chopped green onions for garnish (optional)
    Instructions:
    
    1. Prepare Ingredients: Wash the tomatoes and dice them into small pieces. Crack the eggs into a bowl, add a pinch of salt and pepper, and beat them lightly until combined.
    2. Heat Oil: Heat the vegetable oil in a large non-stick skillet or wok over medium-high heat.
    3. Cook Tomatoes: Add the minced garlic to the hot oil and sauté for about 30 seconds until fragrant. Then, add the diced tomatoes to the skillet. Stir-fry the tomatoes for about 2-3 minutes until they start to soften and release their juices.
    4. Add Eggs: Push the tomatoes to one side of the skillet and pour the beaten eggs into the empty space. Let them cook undisturbed for a few seconds until the edges start to set. Then, use a spatula to scramble the eggs gently, breaking them into smaller pieces as they cook.
    5. Combine: Once the eggs are almost fully cooked, mix them together with the tomatoes in the skillet. Add the soy sauce and sugar, and continue to stir-fry for another 1-2 minutes until everything is well combined and the eggs are fully cooked.
    6. Season: Taste the stir-fry and adjust the seasoning with salt and pepper according to your preference.
    7. Serve: Transfer the stir-fried tomato and scrambled eggs to a serving dish. Garnish with chopped green onions if desired. Serve hot with steamed rice as a main dish or as a side dish.

    Enjoy your homemade Stir-fried Tomato and Scrambled Eggs!`,
    post_id: 1,
  };
  //   const post_id = 1;

  useEffect(() => {
    getComments();
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
      .post("/api/comments/", { content: comment })
      .then((res) => {
        if (res.status === 201) alert("Comment created!");
        else alert("Failed to make comment.");
        getComments();
      })
      .catch((err) => alert(err));
  };

  return (
    <Grid container direction={"row"} rowSpacing={2} marginTop={2}>
      <Grid item xs={6} className="image-grid">
        <img src={image} className="image" />
      </Grid>
      <Grid item xs={6}>
        <div className="center">
          <Box className="titleAndContent">
            <h1 className="title">{post.title}</h1>
            <div className="content-box">
              {/* {post.content.split("").map((elem) => (
                <p>{elem}</p>
              ))} */}
              <p className="content">{post.content}</p>
            </div>
          </Box>
        </div>
        <form onSubmit={createComment}>
          <label htmlFor="content">Write your comment:</label>
          <br />
          <textarea
            id="comment"
            name="comment"
            required
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <br />
          <input type="submit" value="Submit"></input>
        </form>
        <br />
        <div className="center">
          <Box
            width={"83%"}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: "2px", borderRadius: "8px" }}
          >
            <Grid container spacing={0}>
              {comments.map((comment) => (
                <Comment
                  comment={comment}
                  onDelete={deleteComment}
                  key={comment.id}
                />
              ))}
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}

export default SelectedPost_demo;
