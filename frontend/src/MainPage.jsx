import {useState, useEffect} from "react"
import api from "../api"

function addItem(item) {
    const [itemInfo, setItemInfo] = useState([]);
    const [image, setImage] = useState([]);
    const [expDate, setExpDate] = useState("");

    useEffect(() => {},[]);

    const submitInfo = (itemInfo) => {  //submits the added information
        api
            .post("/main/additem/submit/", itemInfo)
            .then((res) => res.data)
            .then((data) => setItemInfo(data))
            .catch((err) => alert(err));
    }

    const insertImage = (image) => {  //inserts image  
        api
            .post("/main/additem/inimage/", image)
            .then((res) => res.data)
            .then((data) => setImage(data))
            .catch((err) => alert(err));
    }

    const getExp = () => {  //get exp date of given item
        api
            .get("/main/additem/exp/${itemName}/")
            .then((res) => res.data)
            .then((data) => setExpDate(data))
            .catch((err) => alert(err));
    }

    return <div>Main Page</div>
}

function disList(foodType) {
    const [list, setList] = useState([]);

    useEffect(() => {}, []);

    const displayList = (foodType) => { //displays given food type list
        api
            .get("/main/dislaylist/${foodType}/")
            .then((res) => res.data)
            .then((data) => {
                setList(data);
                console.log(data)
            })
            .catch((err) => alert(err));
    }

    return <div>Main Page</div>
}

function foodChart() {
    const [chart, setChart] = useState([]);

    useEffect(() => {}, []);

    const disChart = () => {    //display the pie chart that shows the percentage of each food category
        api
            .get("/main/foodchart/")
            .then((res) => res.data)
            .then((data) => {
                setChart(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    }

    return <div>Main Page</div>
}

export default MainPage