import {useState, useEffect} from "react"
import api from "../api"

function navi() {
    const [mainPage, setMainPage] = useState("");
    const [postPage, setPostPage] = useState("");
    const [mealPage, setMealPage] = useState("");
    const [userPage, setUserPage] = useState("");

    useEffect(() => {},[]);

    const toMain = () => {
        api
            .get("/navi/main/")
            .then((res) => res.data)
            .then((data) => setMainPage(data))
            .catch((err) => alert(err));
    }

    const toPost = () => {
        api
            .get("/navi/post/")
            .then((res) => res.data)
            .then((data) => setPostPage(data))
            .catch((err) => alert(err));
    }

    const toMeal = () => {
        api
            .get("/navi/meal/")
            .then((res) => res.data)
            .then((data) => setMealPage(data))
            .catch((err) => alert(err));
    }

    const toUser = () => {
        api
            .get("/navi/user/")
            .then((res) => res.data)
            .then((data) => setUserPage(data))
            .catch((err) => alert(err));
    }

    return <div>Navigation</div>
}

export default Navi