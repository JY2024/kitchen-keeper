import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Meals.css"

// node --version # Should be >= 18
// npm install @google/generative-ai

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyCjScbaLni695WrkNIFsJHC4BayQmIzn-4";


function Meals() {

  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      await api.get("/api/food_items/", {
        signal: abortController.signal
      }) .then((res) => res.data)
      .then((data) => {
        data.forEach(item => addNewIngredient(item));
      })
      .catch((err) => alert(err));
    };
    fetchData();
  
    return () => {
      abortController.abort()
    }
  }, [])

  const [isRecipeVisible, setIsRecipeVisible] = useState(false);
  const [sampleRecipes, setSampleRecipes] = useState([]);
  async function runChat(prompt) {
    console.log("Running chat");
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.5,
      topK: 0,
      topP: 0.95,
      maxOutputTokens: 8192,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: `You are a meal planning assistant. Your task is to generate JSON data containing details about different meals. The JSON should have the following structure:

          {
            "meals": [
              {
                "vegetarian": "Yes/No",
                "preparationTime": Integer (in minutes),
                "name": "Meal Name",
                "description": "Brief description of the meal",
                "instructions": "Step-by-step instructions on how to prepare the meal"
              },
              ... (At least 3 meal objects)
            ]
          }
          
          Each meal object should have the following properties:
          
          - vegetarian: A string indicating whether the meal is vegetarian or not. The value should be either "Yes" or "No".
          - preparationTime: An integer representing the approximate time required to prepare the meal, in minutes.
          - name: A string containing the name of the meal.
          - description: A brief string describing the meal.
          - instructions: A string with step-by-step instructions on how to prepare the meal.
          
          Please generate at least 3 meal objects. Focus on providing clear and concise instructions for each meal.`}],
        },
        {
          role: "model",
          parts: [{ text: "Understood."}],
        },
      ],
    });

    // const result = await chat.sendMessage(prompt);
    const result = await chat.sendMessage("Hello" + prompt);
    const response = result.response;
    setIsRecipeVisible(true);
    const responseText = response.text();
    const jsonStartIndex = responseText.indexOf('{');
    const jsonEndIndex = responseText.lastIndexOf('}');
    const jsonText = responseText.substring(jsonStartIndex, jsonEndIndex + 1);
    const json = JSON.parse(jsonText);
    const sampleRecipes = json.meals.map((recipe, index) => ({
      imgSrc: 'https://via.placeholder.com/150',
      altText: `Recipe ${index + 1}`,
      description: recipe.description,
      title: recipe.name,
      vegetarian: recipe.vegetarian,
      preparationTime: recipe.preparationTime,
      instructions: recipe.instructions,
    }));
    setSampleRecipes(sampleRecipes);
  }
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewIngredientModalOpen, setNewIngredientModalOpen] = useState(false);

  const openNewIngredientModal = () => {
    setNewIngredientModalOpen(true);
  };

  const closeNewIngredientModal = () => {
    setNewIngredientModalOpen(false);
  };

  const addNewIngredient = (newIngredient) => {
    newIngredient.quantityUsed = 0;
    newIngredient.isSelected = false;
    setIngredients(prevIngredients => {
      const updatedIngredients = [...prevIngredients, newIngredient];
      setSelectedItems([...selectedItems, newIngredient]);
      return updatedIngredients;
    });
    closeNewIngredientModal();
  };

  const handleChange = (ingredient) => {
    const index = ingredients.findIndex((item) => item === ingredient);
    const newIngredients = [...ingredients];
    newIngredients[index].isSelected = !newIngredients[index].isSelected;
    setIngredients(newIngredients);
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const types = ["all", "fruits", "meat", "veggies", "diary"];

  function createPrompt() { 
    let selectedIngredients = ingredients.filter(ingredient => ingredient.isSelected);
    selectedIngredients = selectedIngredients.map(ingredient => {
      if (ingredient.quantityUsed <= 0) {
        ingredient.quantityUsed = 0;
      }
      return ingredient;
    });
    selectedIngredients = selectedIngredients.filter(ingredient => ingredient.quantityUsed > 0);
    let prompt = "I have ";
    selectedIngredients.forEach((ingredient, index) => {
      prompt += ingredient.quantityUsed + " " + ingredient.name;
      if (index < selectedIngredients.length - 1) {
        prompt += ", ";
      }
    }
    );
    prompt += ". What can I make with these ingredients?";
    return prompt;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-two-thirds p-8 bg-zinc-100">
      {!isRecipeVisible ? (
        <div className="navbar">
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
      ) : (
        <div></div>
      )}
        
      {!isRecipeVisible ? (
        <ul className="space-y-6">
        {ingredients.filter(meal => (selectedType === 'all' || meal.group === selectedType)).map((meal, index) => (
          <li key={index}>
            <div className="flex items-center space-x-4">
              <img src={meal.unsplash_url} alt={meal.name} onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/100"; }} style={{ maxWidth: '100px', maxHeight: '100px' }}/>
              <div>
                <h2 className="font-bold">{meal.name}</h2>
                <p>Expiration Date: {meal.exp_date}</p>
                <p>Quantity Available: {meal.quantity}</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* <input type="checkbox" /> */}
                <input
                  type="checkbox"
                  checked={meal.isSelected}
                  onChange={() => handleChange(meal)}
                />
                <button className="px-2" onClick={() => {
                  const updatedMeals = ingredients.map((item) => 
                    item === meal ? { ...item, quantityUsed: item.quantityUsed - 1 } : item
                  );
                  setIngredients(updatedMeals);
                }}>-</button>
                <input 
                  type="number" 
                  value={meal.quantityUsed} 
                  onChange={(e) => {
                    let newQuantity = Number(e.target.value);
                    const updatedMeals = ingredients.map((item) => 
                      item === meal ? { ...item, quantityUsed: newQuantity } : item
                    );
                    setIngredients(updatedMeals);
                  }}
                />
                <button className="px-2" onClick={() => {
                  const updatedMeals = ingredients.map((item) => 
                    item === meal ? { ...item, quantityUsed: item.quantityUsed + 1 } : item
                  );
                  setIngredients(updatedMeals);
                }}>+</button>
              </div>
            </div>
          </li>
        ))}
        </ul>
      ) : (
        <div className="recipe-cards">
          {sampleRecipes.map((recipe, index) => (
            <div key={index} className="recipe-card" onClick={() => openModal(recipe)}>
              <img src={recipe.imgSrc} alt={recipe.altText}/>
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <button>Show More</button>
            </div>
          ))}
        </div>
      )}
      {!isRecipeVisible && (
        <button className="form-button" onClick={openNewIngredientModal}>+</button>
      )}
      {isNewIngredientModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeNewIngredientModal}>&times;</span>
            <form onSubmit={(e) => {
              e.preventDefault();
              addNewIngredient({
                unsplash_url: e.target.elements.unsplash_url.value,
                altText: e.target.elements.altText.value,
                name: e.target.elements.name.value,
                exp_date: e.target.elements.exp_date.value,
                quantity: e.target.elements.quantity.value,
                group: e.target.elements.group.value,
                desc : e.target.elements.desc.value
              });
            }}>
              <input className="form-input" name="unsplash_url" placeholder="Image Source" />
              <input className="form-input" name="altText" placeholder="Alt Text" />
              <input className="form-input" name="name" placeholder="Name" />
              <input className="form-input" name="exp_date" placeholder="Expiration Date" />
              <input className="form-input" name="quantity" placeholder="Quantity Available" />
              <input className="form-input" name="group" placeholder="Type" />
              <input className="form-input" name="desc" placeholder="Description" />
              <button className="form-button" type="submit">Add Ingredient</button>
            </form>
          </div>
        </div>
      )}
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedRecipe.imgSrc} alt={selectedRecipe.altText} className="modal-image"/>
            <h2>{selectedRecipe.title}</h2>
            <p>{selectedRecipe.preparationTime} minutes | 
              {selectedRecipe.vegetarian === "Yes" ? (
                <span className="checkmark">&#10003; </span>
              ) : (
                <span className="crossmark" style={{color: 'red'}}>✖ </span>
              )}
              Vegetarian
            </p>
            <p>{selectedRecipe.description}</p>
            <h3>Instructions:</h3>
            {selectedRecipe.instructions.split(/\d+\./).filter((_, index) => index !== 0).map((instruction, index) => (
              <p key={index}>{`${index + 1}. ${instruction.trim()}`}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  
    <div className="w-one-third p-8">
      <div className="mb-4">
        <h2 className="font-bold mb-2">Selected</h2>
        {ingredients.length > 0 && (
          <div className="selected-item">
            <img src={ingredients[ingredients.length - 1].unsplash_url} alt={ingredients[ingredients.length - 1].altText} onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/100"; }} style={{ maxWidth: '100px', maxHeight: '100px' }}/>
            <div className="item-details">
              <span>{ingredients[ingredients.length - 1].name}</span>
              <div className="flex items-center space-x-2">
              <button className="px-2" onClick={() => {
                  const updatedIngredients = ingredients.map((item) => 
                    item === ingredients[ingredients.length - 1] ? { ...item, quantityUsed: item.quantityUsed - 1 } : item
                  );
                  setIngredients(updatedIngredients);
                }}>-</button>
                <span>{ingredients[ingredients.length - 1].quantityUsed}</span>
                <button className="px-2" onClick={() => {
                  const updatedIngredients = ingredients.map((item) => 
                    item === ingredients[ingredients.length - 1] ? { ...item, quantityUsed: item.quantityUsed + 1 } : item
                  );
                  setIngredients(updatedIngredients);
                }}>+</button>
              </div>
            </div>
            <button className="remove-button">Remove</button>
          </div>
        )}
        {ingredients.length > 0 && (
          <div className="item-info">
            <div className="info-row">
              <p>Calories:</p>
              <p>{ingredients[ingredients.length - 1].calories} cal</p>
            </div>
            <div className="info-row">
              <p>Sugar:</p>
              <p>{ingredients[ingredients.length - 1].sugar} g</p>
            </div>
            <div className="info-row">
              <p>Other Info:</p>
              <p>{ingredients[ingredients.length - 1].otherInfo}</p>
            </div>
          </div>
        )}
      </div>
      <button className="w-full py-2 bg-green-500 text-white rounded-lg" onClick={() => runChat(createPrompt())}>Generate Recipes</button>
    </div>
  </div>
  );
}

export default Meals;