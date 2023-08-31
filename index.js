const API_KEY = "53088897b9a34d36993cd02d43292db3";
const recipeListElement = document.getElementById("recipe-list");

function displayRecipes(recipes) {
  recipeListElement.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeItemElement = document.createElement("li");
    recipeItemElement.classList.add("recipe-item");
    recipeImageElement = document.createElement("img");
    recipeImageElement.src = recipe.image;
    recipeImageElement.alt = "recipe image";

    recipeTitleElement = document.createElement("h2");
    recipeTitleElement.innerText = recipe.title;

    recipeIngredientsElement = document.createElement("p");
    recipeIngredientsElement.innerHTML = `<strong>Ingredients:</strong> ${recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ")}`;

    recipeLinkElement = document.createElement("a");
    recipeLinkElement.href = recipe.sourceUrl;
    recipeLinkElement.innerText = "View Recipe";

    recipeItemElement.appendChild(recipeImageElement);
    recipeItemElement.appendChild(recipeTitleElement);
    recipeItemElement.appendChild(recipeIngredientsElement);
    recipeItemElement.appendChild(recipeLinkElement);

    recipeListElement.appendChild(recipeItemElement);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=30&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

init();
