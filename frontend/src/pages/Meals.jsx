import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Meals.css"

function Meals() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const types = ["all", "fruits", "meat", "veggies", "diary"];
  const meals = [
    {
      imgSrc: "https://placehold.co/100x100",
      altText: "Tomato",
      title: "Tomato",
      expirationDate: "3/24/24",
      quantityAvailable: 50,
      type: "fruits",
      calories: 95,
      sugar: 19,
      otherInfo: 'Vitamin C: 14%'
    },
    {
      imgSrc: "https://placehold.co/100x100",
      altText: "Pear",
      title: "Pear",
      expirationDate: "3/24/24",
      quantityAvailable: 50,
      type: "fruits",
      calories: 95,
      sugar: 19,
      otherInfo: 'Vitamin C: 14%'
    },
    {
      imgSrc: "https://placehold.co/100x100",
      altText: "Apple",
      title: "Apple",
      expirationDate: "4/24/24",
      quantityAvailable: 60,
      type: "fruits",
      calories: 95,
      sugar: 19,
      otherInfo: 'Vitamin C: 14%'
    },
  ];

  // Fetch selected items
  useEffect(() => {
    api.get("/inventory/selected")
      .then(response => setSelectedItems(response.data))
      .catch(error => console.error("Error fetching selected items:", error));
  }, []);

  // Add or remove item from selected list
  const updateSelectedItems = (item, action) => {
    api.post("/inventory/selected", { item, action })
      .then(response => setSelectedItems(response.data))
      .catch(error => console.error("Error updating selected items:", error));
  };

  // Generate recipes based on selected items
  const generateRecipes = (parameters) => {
    api.post("/recipes/generate", parameters)
      .then(response => {
        setRecipes(response.data);
        setSelectedItems([]); // Clear the selected items
      })
      .catch(error => console.error("Error generating recipes:", error));
  };

  // Fetch suggested recipes
  useEffect(() => {
    api.get("/recipes")
      .then(response => setRecipes(response.data))
      .catch(error => console.error("Error fetching recipes:", error));
  }, [selectedItems]);

  // Fetch selected recipe
  const getSelectedRecipe = (recipeId) => {
    api.get(`/recipes/selected/${recipeId}`)
      .then(response => setSelectedRecipe(response.data))
      .catch(error => console.error("Error fetching selected recipe:", error));
  };

  const sampleRecipes = [
    { imgSrc: 'https://via.placeholder.com/150', altText: 'Recipe 1', description: 'This is recipe 1', title: 'Recipe 1'},
    { imgSrc: 'https://via.placeholder.com/150', altText: 'Recipe 2', description: 'This is recipe 2', title: 'Recipe 2'},
    { imgSrc: 'https://via.placeholder.com/150', altText: 'Recipe 3', description: 'This is recipe 3', title: 'Recipe 3'},
    // Add more recipes as needed
  ];

  return (
    
    <div className="flex min-h-screen">
      <div className="w-two-thirds p-8 bg-zinc-100">
        {/* <div className="navbar">
          {types.map((type, index) => (
          <div
            key={index}
            onClick={() => setSelectedType(type)}
            className={selectedType === type ? 'tab-selected' : ''}
          >
            {type}
          </div>
        ))}
      </div>
      <ul className="space-y-6">
      {meals.filter(meal => (selectedType === 'all' || meal.type === selectedType)).map((meal, index) => (
        <li key={index}>
          <div className="flex items-center space-x-4">
            <img src={meal.imgSrc} alt={meal.altText} />
            <div>
              <h2 className="font-bold">{meal.title}</h2>
              <p>Expiration Date: {meal.expirationDate}</p>
              <p>Quantity Available: {meal.quantityAvailable}</p>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" />
              <button className="px-2">-</button>
              <span>1</span>
              <button className="px-2">+</button>
            </div>
          </div>
        </li>
      ))}
      </ul> */}
      <div className="recipe-cards">
          {sampleRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card" onClick={() => openModal(recipe)}>
              <img src={recipe.imgSrc} alt={recipe.altText}/>
              <p>{recipe.description}</p>
              <button>Show More</button>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedRecipe.imgSrc} alt={selectedRecipe.altText} className="modal-image"/>
            <h2>{selectedRecipe.title}</h2>
            <p>15 minutes | <span className="checkmark">&#10003;</span> Vegetarian</p>
            <p>{selectedRecipe.description}</p>
          </div>
        </div>
      )}
    </div>
  
      
      <div className="w-one-third p-8">
        <div className="mb-4">
          <h2 className="font-bold mb-2">Selected</h2>
          <div className="selected-item">
            <img src="https://placehold.co/50x50" alt="Tomato"/>
            <div className="item-details">
              <span>Tomato</span>
              <div className="flex items-center space-x-2">
                <button className="px-2 button-circle">-</button>
                <span>20</span>
                <button className="px-2 button-circle">+</button>
              </div>
            </div>
            <button className="remove-button">Remove</button>
          </div>
          <div className="item-info">
            <div className="info-row">
              <p>Calories:</p>
              <p>440 cal</p>
            </div>
            <div className="info-row">
              <p>Sugar:</p>
              <p>40 g</p>
            </div>
            <div className="info-row">
              <p>Other Info:</p>
              <p>30</p>
            </div>
          </div>
        </div>
        <button className="w-full py-2 bg-green-500 text-white rounded-lg">Generate Recipes</button>
        <button className="w-12 h-12 rounded-full bg-red-500 text-white absolute bottom-4 right-4">J</button>
      </div>
  </div>
  );
}

export default Meals;