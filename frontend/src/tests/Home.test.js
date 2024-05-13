import { readFile, writeFile } from "fs/promises";
import assert from "node:assert/strict";

let db = await readFile("test_data.json");
let data = JSON.parse(db);
let foodItemData = data.foodItems;

const defaultData = [
    { id: 1, value: 10, label: "Vegetables", color: "#39892f" },
    { id: 2, value: 15, label: "Fruits", color: "#c01f25" },
    { id: 3, value: 20, label: "Dairy", color: "#08629a" },
    { id: 4, value: 25, label: "Meat", color: "#6b2c91" },
    { id: 5, value: 30, label: "Grains", color: "#F5DEB3" },
    { id: 6, value: 35, label: "Drinks", color: "#00FFFF" },
    { id: 7, value: 40, label: "Other", color: "#e96d1e" },
];
// ---------------------------------------Functions to test ------------------------------------
const getFoodItemsForPieChart = () => {
    let jsonData = JSON.parse(JSON.stringify(foodItemData));

    let data = JSON.parse(JSON.stringify(defaultData));

    data.forEach((group) => {
        group["value"] = 0;
    });

    // For each food item that the user has
    // from the database, increment a food
    // group by one to account for
    // that food item's type

    jsonData.forEach((item) => {
        if (item["group"] === "Vegetables") {
            data[0]["value"] += 1;
        }

        if (item["group"] === "Fruits") {
            data[1]["value"] += 1;
        }

        if (item["group"] === "Dairy") {
            data[2]["value"] += 1;
        }

        if (item["group"] === "Meat") {
            data[3]["value"] += 1;
        }

        if (item["group"] === "Honey") {
            data[4]["value"] += 1;
        }
    });

    // filter out food groups that the user does not have
    let foodData = data.filter((group) => group["value"] > 0);
    return foodData;
};

// ---------------------------------------Testing ------------------------------------
const result = getFoodItemsForPieChart();
console.log("---> getFoodItemsForPieChart returns the correct amount of entries")
assert(result.length === 2);
console.log("---> getFoodItemsForPieChart returns the correct entries")
assert(result.some(entry => entry.value === 1 && entry.label === "Vegetables") && result.some(entry => entry.value === 2 && entry.label === "Fruits"));