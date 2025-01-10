const appId = "67613f14";
const appKey = "3df41f859d401b7d38a8c82d219244ad";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${appId}&app_key=${appKey}`;
const recipeContainer = document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
// q=paneer&app_id=67613f14&app_key=3df41f859d401b7d38a8c82d219244ad
txtSearch.addEventListener("keyup", (e) => {
 const inputVal = txtSearch.value;
  // if (e.keyCode === 13) {
    loadRecipies(inputVal)
  // }
});

function loadRecipies(type="") {
  const url = baseUrl + `&q=${type}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderRecipipes(data.hits))
    .catch((error) => console.log(error));
}
loadRecipies();

function getRecipeStepsStr(ingredientLines = []) {
  let str = " ";
  for (var step of ingredientLines) {
    str = str + `<li>${step}</li>`;
  }
  return str;
}

const renderRecipipes = (recipelist = []) => {
  recipeContainer.innerHTML="";
    recipelist.forEach((recipeObj) => {
      const {
        label: recipeTitle,
        ingredientLines,
        image: recipeImage,
      } = recipeObj.recipe;
      const recipreStepStr = getRecipeStepsStr(ingredientLines);
       const htmlStr = ` <div class="recipe">
          <div class="recipe-title">${recipeTitle}</div>
          <div class="recipe-image">
            <img src="${recipeImage}"/>
          </div>
          <div class="recipe-text">
            <ul>
            ${recipreStepStr}
            </ul>
          </div>
        </div>`;
        recipeContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};