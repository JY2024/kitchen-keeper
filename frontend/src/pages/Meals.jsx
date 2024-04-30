import { useState, useEffect } from "react";
import api from "../api";

function Meals() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
      .then(response => setRecipes(response.data))
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

  return (
    <h1>Meals </h1>
  );
}

export default Meals;