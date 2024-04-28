import {useState, useEffect} from "react"
import api from "../api"

function PostsMain() {
    const [posts, setPosts] = useState([]); // this stores the posts
    const [resultPosts, setResultPosts] = useState([]); // from using the search bar

    useEffect(() => { // render once
        getPosts();
    }, [])

    const getPosts = () => { // get all posts to display on the page
        api.get("/api/store/posts")
        .then((res) => res.data)
        .then((data) => setPosts(data))
        .catch((err) => alert(err));
    };

    // REQUESTS
    const getPostByID = (postID) => { // get post by post ID (a string)
        api.get(`/api/store/getPost/id/${postID}/`)
        .then((res) => res.data)
        .then((data) => setResultPosts([...resultPosts, data]))
        .catch((err) => alert(err));
    };
    const getPostByTitle = (title) => { // get post by post title (a string)
        api.get(`/api/store/getPost/title/${title}/`)
        .then((res) => res.data)
        .then((data) => setResultPosts([...resultPosts, data]))
        .catch((err) => alert(err));
    };
    const getPostByTags = (tags) => { // get post by tags (an array)
        const tagsString = tags.join(",");
        api.get(`/api/store/getPost/tags/${tagsString}/`)
        .then((res) => res.data)
        .then((data) => setResultPosts([...resultPosts, data]))
        .catch((err) => alert(err));
    };
    const createPost = (title, author, body, picture) => { // make a new post
        const postData = {title: title, author: author, body: body, picture: picture};
        api.post("/api/store/makePost/", postData)
        .then((res) => res.data)
        .then((data) => setPosts([...posts, data]))
        .catch((err) => alert(err));
    };

    // UI


    return <div>Posts Main Page</div>
}

export default PostsMain