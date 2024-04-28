import {useState, useEffect} from "react"
import api from "../api"

function PostSpecific(postID) {
    const [post, setPost] = useState(); // object with all post data
    const [comments, setComments] = useState([]); // this stores the comments for the post

    useEffect(() => {
        api.get(`/api/store/getPost/id/${postID}/`).then((res) => setPost(res.data));
        getComments();
    }, [comments, postID]);

    const getComments = () => { // get all the comments for this post
        api.get(`/api/store/comments/${postID}/`)
        .then((res) => res.data)
        .then((data) => setComments(data))
        .catch((err) => alert(err));
    }

    const createComment = (author, body) => { // make a new comment
        const commentData = {author: author, body: body};
        api.post("/api/store/comment/create/", commentData)
        .then((res) => res.data)
        .then((data) => setComments([...comments, data]))
        .catch((err) => alert(err));
    }

    const deleteComment = (commentID) => { //  delete comment with this commentID
        api.delete(`api/store/comment/delete/${commentID}/`)
        .then((res) => null)
        .catch((err) => alert(err));
    };

    const addLike = () => { // add a like to this recipe
        api.post("/api/store/addLike", postID)
        .then((res) => res.data)
        .then((data) => setPost(data))
        .catch((err) => alert(err));
    }

    const subscribe = () => { // subscribe to this author
        api.post("/api/user/subscriptions/add/", post.author)
        .then((res) => res.data)
        .then((data) => null)
        .catch((err) => alert(err));
    }

    return <div>Specific Post Page</div>
}

export default PostSpecific