// these functions were copied from SocialPage.jsx and sligthly modified

// fetch('test_data.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));

import { readFile, writeFile } from "fs/promises";
import assert from "node:assert/strict";

let db = await readFile("test_data.json");
let data = JSON.parse(db);
let recipeData = data.recipes;

//--------------------------------------------- Fake Functions and Data Structures ----------------------------------------
const getAllRecipes = () => {
    return recipeData;
}

//--------------------------------------------- Functions to Test ----------------------------------------
const getRecipesFiltered = (filterOption, searchQuery) => {
    let returned_data = [];
    if (searchQuery === "") {
        returned_data = getAllRecipes();
    } else {
        let data = recipeData;
        searchQuery = searchQuery.toLowerCase().split(" "); // array of terms in the query
        if (filterOption === "title") {
            const title_check = (title_string) => searchQuery.some(queryTerm => title_string.toLowerCase().includes(queryTerm)); // check if some query term is in the title
            returned_data = data.filter(recipe => title_check(recipe.title)); // only display recipes that contain at least one query term
        } else if (filterOption === "tags") {
            const tag_check = (tag_arr) => searchQuery.some(queryTerm => tag_arr.includes(queryTerm)); // check if some query term is in the tags
            returned_data = data.filter(recipe => tag_check(recipe.tags));
        } else if (filterOption === "ingredients") {
            const ingred_check = (ingred_arr) => searchQuery.some(queryTerm => ingred_arr.includes(queryTerm)); // check if the ingredient array contains a query term
            returned_data = data.filter(recipe => {
                let ingreds = recipe.ingredients;
                let ingreds2 = [];
                ingreds.forEach((ingred_str) => {
                    ingreds2 = ingreds2.concat(ingred_str.split(" ")); // because an ingred_str might be like "20 avocados" so we want "avocados" in the ingredient array before checking
                });
                return ingred_check(ingreds2);
            });
        } else {
            returned_data = data // just display all the recipes if no filterOption provided
        }
    }
    return returned_data;
}

const findPopularTags = () => {
    let all_tags_and_counts = []; // each entry is [tag name, (int) count of tag over all recipes]
    const tags_seen = []; // keep track of tags already seen to avoid duplicates
    recipeData.forEach(recipe => { // for each recipe, count their tags and update all_tags_and_counts
        const cur_tags = recipe.tags; // array of strings
        cur_tags.forEach(t => {
            if (!(tags_seen.includes(t))) {
                all_tags_and_counts.push([t, 0]);
                tags_seen.push(t);
            }
            all_tags_and_counts.find(sub_arr => sub_arr[0] === t)[1] += 1; // find the entry that has the term t and increment count of how mnay times we've seen it so far
        });
    });
    all_tags_and_counts = all_tags_and_counts.sort((arr1, arr2) => {
        return arr2[1] - arr1[1]; // descending order by count
    });
    const tags_to_add = []; // tags that will be displayed
    for (let i = 0; i < 5; i++) {
        if (i < all_tags_and_counts.length) { // within range
            tags_to_add.push(all_tags_and_counts[i][0]); // add the term
        }
    }
    return tags_to_add;
};

//--------------------------------------------- Tests ----------------------------------------
// getRecipesFiltered = (filterOption, searchQuery)
console.log("---> getRecipesFiltered contains the correct items when filtering option is title")
const result_title = getRecipesFiltered("title", "fries Pho");
assert(result_title.length === 2 && result_title.some(recipe => recipe.title === "Best Pho Ever!") && result_title.some(recipe => recipe.title === "Very Nice Fries!"));
console.log("---> getRecipesFiltered contains the correct items when filtering option is tags")
const result_tags = getRecipesFiltered("tags", "asian");
assert(result_tags.length === 5 && result_tags.some(recipe => recipe.title === "Best Pho Ever!") && result_tags.some(recipe => recipe.title === "Sushi") && result_tags.some(recipe => recipe.title === "Cantonese-Style Ribs") && result_tags.some(recipe => recipe.title === "a") && result_tags.some(recipe => recipe.title === "b"));
console.log("---> getRecipesFiltered contains the correct items when filtering option is ingredients")
const result_ing = getRecipesFiltered("ingredients", "sauce");
assert(result_ing.length === 2 && result_ing.some(recipe => recipe.title === "Cantonese-Style Ribs") && result_ing.some(recipe => recipe.title === "Very Nice Fries!"));

// tests for findPopularTags
const resultFindTags = findPopularTags();
console.log("---> findPopularTags returns the correct number of tags")
assert(resultFindTags.length === 5);
console.log("---> findPopularTags returns the correct tags in the correct order");
assert(resultFindTags[0] === "asian" && resultFindTags[1] === "fast food" && resultFindTags[2]  === "noodles" && resultFindTags[3] === "soup" && resultFindTags[4]);
const lastElem = resultFindTags.slice(4)[0];
assert(lastElem === "vietnamese" || lastElem === "burger" || lastElem === "vegetarian" || lastElem === "japanese" || lastElem === "chinese" || lastElem === "pork" || lastElem === "salty");