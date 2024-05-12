import { useState, useEffect } from "react";
import api from "../api";
import Grid from "@mui/material/Grid";
import "../styles/SelectedPost.css";
import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";

function SelectedPost() {
  const location = useLocation();
  const data = location.state;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const post = {
    post_id: data.id,
    title: data.title,
    description: data.description,
    img: data.img,
    ingredients: data.ingredients,
    instructions: data.instructions,
  };

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    api
      .get(`/api/comments/?post_id=${post.post_id}`)
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
      .post(`/api/comments/`, {
        content: comment,
        post_id: post.post_id,
      })
      .then((res) => {
        if (res.status === 201) alert("Comment created!");
        else alert("Failed to make comment.");
        getComments();
      })
      .catch((err) => alert(err));
  };

  const getDate = (comment) => {
    const date = new Date(comment.created_at).toLocaleDateString("en-US");
    return date;
  };

  return (
    <Box>
      <Navbar />
      <Grid container direction={"row"} rowSpacing={2} marginTop={2}>
        <Grid item xs={6} md={8} className="image-grid">
          <img src={post.img.split(" ").join("+")} className="image" />
        </Grid>
        <Grid item xs={6} md={4}>
          <Box className="titleAndContent">
            <Typography variant="h3" component="h4">
              {post.title}
            </Typography>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Description</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{post.description}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Ingredients</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {post.ingredients.map((elem) => (
                  <Typography>{elem}</Typography>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ marginBottom: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Instructions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{post.instructions}</Typography>
              </AccordionDetails>
            </Accordion>
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
          </Box>
          <Box
            width={"83%"}
            my={4}
            display="flex"
            alignItems="flex-start"
            gap={4}
            p={2}
            sx={{ border: "2px", borderRadius: "8px" }}
          >
            <List>
              {comments.map((comment, index) => (
                <ListItemButton
                  key={index + comment}
                  sx={{ justifyContent: "end", alignItems: "end" }}
                >
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.author}
                    secondary={comment.content}
                  />
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => deleteComment(comment.id)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SelectedPost;
