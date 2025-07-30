const foodFilter = document.getElementById("foodFilter");
const mealsDisplay = document.getElementById("mealsDisplay");

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const dishTitle = document.getElementById("dishTitle");
const dishImg = document.getElementById("dishImg");
const ingredientsList = document.getElementById("ingredientsList");
const instructions = document.getElementById("instructions");
const videoLink = document.getElementById("videoLink");

foodFilter.addEventListener("change", () => {
  const chosen = foodFilter.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${chosen}`)
    .then((res) => res.json())
    .then((data) => renderMeals(data.meals));
});

function renderMeals(meals) {
  mealsDisplay.innerHTML = "";
  meals.forEach((item) => {
    const box = document.createElement("div");
    box.className = "card";
    box.innerHTML = `
      <img src="${item.strMealThumb}" alt="${item.strMeal}" />
      <h4>${item.strMeal}</h4>
    `;
    box.addEventListener("click", () => showMealDetails(item.idMeal));
    mealsDisplay.appendChild(box);
  });
}

function showMealDetails(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      dishTitle.textContent = meal.strMeal;
      dishImg.src = meal.strMealThumb;
      instructions.textContent = meal.strInstructions;
      videoLink.href = meal.strYoutube || "#";
      videoLink.style.display = meal.strYoutube ? "inline-block" : "none";

      ingredientsList.innerHTML = "";
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          const li = document.createElement("li");
          li.textContent = `${ing} - ${measure}`;
          ingredientsList.appendChild(li);
        }
      }

      popup.style.display = "flex";
    });
}

closeBtn.onclick = () => {
  popup.style.display = "none";
};

window.onclick = (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
};
