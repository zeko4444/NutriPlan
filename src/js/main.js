/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
let searchInput = document.getElementById("search-input");
let allRecipesSection = document.getElementById("all-recipes-section");
let mealDetailsSection = document.getElementById("meal-details");
let mealCategoriesSection = document.getElementById("meal-categories-section");
let searchFilterSection = document.getElementById("search-filters-section");
let foodLogLink = document.getElementById("food-log-link");
let mealsRecipesLink = document.getElementById("meals-recipes-link");
let productScannerLink = document.getElementById("product-scanner-link");
let foodLogSection = document.getElementById("foodlog-section");
let h1InHeader = document.querySelector("#header h1");
let pInHeader = document.querySelector("#header p");
let foodLogDate = document.getElementById("foodlog-date");
let productSearchInput = document.getElementById("product-search-input");
let searchProductBtn = document.getElementById("search-product-btn");
let productsSection = document.getElementById("products-section");
let productsGrid = document.getElementById("products-grid");
let productsCount = document.getElementById("products-count");
let barcodeInput = document.getElementById("barcode-input");
let lookupBarcodeBtn = document.getElementById("lookup-barcode-btn");
let productCategories = document.getElementById("product-categories");
let foodModal = document.getElementById("food-modal");
let logFoodBtn = document.getElementById("log-food-btn");
let closeFoodModal = document.getElementById("close-food-modal");
let closeFoodBtn = document.getElementById("close-food-btn");
let mealsContainer = document.getElementById("recipes-grid");
let quickLogBtn = document.getElementById("quick-log-btn");
let quickScanBtn = document.getElementById("quick-scan-btn");

let selectedProduct = null;

let categoryStyles = {
  Beef: {
    icon: "fa-solid fa-drumstick-bite",
    card: "from-red-50 to-rose-50",
    iconBg: "from-red-400 to-rose-500",
    border: "border-red-200 hover:border-red-400",
  },
  Chicken: {
    icon: "fa-solid fa-drumstick-bite",
    card: "from-yellow-50 to-orange-50",
    iconBg: "from-yellow-400 to-orange-500",
    border: "border-yellow-200 hover:border-yellow-400",
  },
  Dessert: {
    icon: "fa-solid fa-cake-candles",
    card: "from-pink-50 to-rose-50",
    iconBg: "from-pink-400 to-rose-500",
    border: "border-pink-200 hover:border-pink-400",
  },
  Lamb: {
    icon: "fa-solid fa-drumstick-bite",
    card: "from-orange-50 to-amber-50",
    iconBg: "from-orange-400 to-amber-500",
    border: "border-orange-200 hover:border-orange-400",
  },

  Miscellaneous: {
    icon: "fa-solid fa-bowl-rice",
    card: "from-lime-50 to-green-50",
    iconBg: "from-lime-400 to-green-500",
    border: "border-lime-200 hover:border-lime-400",
  },
  Pasta: {
    icon: "fa-solid fa-bowl-food",
    card: "from-amber-50 to-yellow-50",
    iconBg: "from-amber-400 to-yellow-500",
    border: "border-amber-200 hover:border-amber-400",
  },
  Pork: {
    icon: "fa-solid fa-bacon",
    card: "from-rose-50 to-red-50",
    iconBg: "from-rose-400 to-red-500",
    border: "border-rose-200 hover:border-rose-400",
  },
  Seafood: {
    icon: "fa-solid fa-fish",
    card: "from-cyan-50 to-sky-50",
    iconBg: "from-cyan-400 to-sky-500",
    border: "border-cyan-200 hover:border-cyan-400",
  },
  Side: {
    icon: "fa-solid fa-plate-wheat",
    card: "from-lime-50 to-green-50",
    iconBg: "from-lime-400 to-green-500",
    border: "border-lime-200 hover:border-lime-400",
  },
  Starter: {
    icon: "fa-solid fa-utensils",
    card: "from-indigo-50 to-blue-50",
    iconBg: "from-indigo-400 to-blue-500",
    border: "border-indigo-200 hover:border-indigo-400",
  },
  Vegan: {
    icon: "fa-solid fa-leaf",
    card: "from-green-50 to-emerald-50",
    iconBg: "from-green-400 to-emerald-500",
    border: "border-green-200 hover:border-green-400",
  },
  Vegetarian: {
    icon: "fa-solid fa-seedling",
    card: "from-emerald-50 to-teal-50",
    iconBg: "from-emerald-400 to-teal-500",
    border: "border-emerald-200 hover:border-emerald-400",
  },
  Breakfast: {
    icon: "fa-solid fa-mug-hot",
    card: "from-orange-50 to-amber-50",
    iconBg: "from-orange-400 to-amber-500",
    border: "border-orange-200 hover:border-orange-400",
  },
  Goat: {
    icon: "fa-solid fa-paw",
    card: "from-stone-50 to-neutral-50",
    iconBg: "from-stone-400 to-neutral-500",
    border: "border-stone-200 hover:border-stone-400",
  },
};

let dailyValues = {
  protein: 50,
  carbs: 275,
  fat: 78,
  fiber: 28,
  sugar: 50,
  saturatedFat: 20,
};

let searchedProducts = [];
let allProducts = [];
let currentSearchText = "";

let categoryStylesProducts = [
  {
    bg: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
    icon: "fa-cookie",
  },
  {
    bg: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    icon: "fa-glass-water",
  },
  {
    bg: "bg-amber-100 text-amber-700 hover:bg-amber-200",
    icon: "fa-bread-slice",
  },
  {
    bg: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    icon: "fa-ice-cream",
  },
  {
    bg: "bg-rose-100 text-rose-700 hover:bg-rose-200",
    icon: "fa-cheese",
  },
];
foodLogSection.classList.add("hidden");
productsSection.classList.add("hidden");

function calculateWidthPercentage(value, max) {
  return Math.min((value / max) * 100, 100);
}

function renderLoggedMeals() {
  let meals = JSON.parse(localStorage.getItem("loggedMeals")) || [];

  let loggedItemsList = document.getElementById("logged-items-list");

  let clearBtn = document.getElementById("clear-foodlog");
  let title = document.querySelector(".border-t h4");

  title.textContent = `Logged Items (${meals.length})`;

  if (meals.length === 0) {
    clearBtn.style.display = "none";

    loggedItemsList.innerHTML = `
     <div class="text-center py-8 text-gray-500">
                  <i
                    class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"
                  ></i>
                  <p class="font-medium">No meals logged today</p>
                  <p class="text-sm">
                    Add meals from the Meals page or scan products
                  </p>
                </div>
    `;

    return;
  }

  clearBtn.style.display = "block";

  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedMeals");

    renderLoggedMeals();
    updateTodayNutrition();
    renderWeeklyOverview();
  });

  loggedItemsList.innerHTML = meals
    .map((meal, index) => {
      let time = new Date(meal.loggedAt).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });

      return `
      <div class="flex items-center justify-between bg-gray-50 rounded-2xl p-4">

        <div class="flex items-center gap-4">

          <img
            src="${meal.image}"
            class="w-16 h-16 rounded-xl object-cover"
          />

          <div>

            <h3 class="font-bold text-xl text-gray-900">
              ${meal.name}
            </h3>

            <p class="text-gray-500">
              ${meal.servings ? `${meal.servings} serving ` : ""}
              •
              <span class="text-emerald-600">Recipe</span>
            </p>

            <p class="text-gray-400 text-sm">
              ${time}
            </p>

          </div>

        </div>

        <div class="flex items-center gap-5">

          <div class="text-right">

            <p class="text-3xl font-bold text-emerald-600">
             ${meal.calories || meal.nutrients.calories.toFixed(2)} 
            </p>

            <p class="text-gray-500">
              kcal
            </p>

          </div>

          <div class="flex gap-2">

            <span class="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
              ${meal.protein || meal.nutrients.protein.toFixed(2)}g P
            </span>

            <span class="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm">
              ${meal.carbs || meal.nutrients.carbs.toFixed(2)}g C
            </span>

            <span class="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm">
              ${meal.fat || meal.nutrients.fat.toFixed(2)}g F
            </span>

          </div>

          <button
            class="deleteMeal text-gray-400 hover:text-red-500"
            data-index="${index}"
          >
            <i class="fa-solid fa-trash"></i>
          </button>

        </div>

      </div>
      `;
    })
    .join("");

  // Delete meal
  document.querySelectorAll(".deleteMeal").forEach((btn) => {
    btn.addEventListener("click", () => {
      meals.splice(btn.dataset.index, 1);
      localStorage.setItem("loggedMeals", JSON.stringify(meals));
      renderLoggedMeals();
      updateTodayNutrition();
      renderWeeklyOverview();
    });
  });
}

function updateTodayNutrition() {
  let meals = JSON.parse(localStorage.getItem("loggedMeals")) || [];

  let today = new Date().toDateString();

  let todayMeals = meals.filter(
    (meal) => new Date(meal.loggedAt).toDateString() === today,
  );

  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;

  todayMeals.forEach((meal) => {
    calories += meal.calories || meal.nutrients.calories;
    protein += meal.protein || meal.nutrients.protein;
    carbs += meal.carbs || meal.nutrients.carbs;
    fat += meal.fat || meal.nutrients.fat;
  });

  let calorieGoal = 2000;
  let proteinGoal = 50;
  let carbsGoal = 250;
  let fatGoal = 65;

  document.getElementById("todayCaloriesText").textContent =
    `${calories} / ${calorieGoal} kcal`;

  document.getElementById("todayProteinText").textContent =
    `${protein} / ${proteinGoal} g`;

  document.getElementById("todayCarbsText").textContent =
    `${carbs} / ${carbsGoal} g`;

  document.getElementById("todayFatText").textContent = `${fat} / ${fatGoal} g`;

  // Progress bars
  document.getElementById("todayCaloriesBar").style.width =
    `${Math.min((calories / calorieGoal) * 100, 100)}%`;

  document.getElementById("todayProteinBar").style.width =
    `${Math.min((protein / proteinGoal) * 100, 100)}%`;

  document.getElementById("todayCarbsBar").style.width =
    `${Math.min((carbs / carbsGoal) * 100, 100)}%`;

  document.getElementById("todayFatBar").style.width =
    `${Math.min((fat / fatGoal) * 100, 100)}%`;
}

function renderWeeklyOverview() {
  let container = document.getElementById("weekly-chart");

  let meals = JSON.parse(localStorage.getItem("loggedMeals")) || [];

  container.innerHTML = "";

  let today = new Date();

  for (let i = 6; i >= 0; i--) {
    let date = new Date(today);
    date.setDate(today.getDate() - i);

    let dayMeals = meals.filter(
      (meal) => new Date(meal.loggedAt).toDateString() === date.toDateString(),
    );

    let calories = dayMeals.reduce(
      (sum, meal) => sum + (meal.calories || meal.nutrients.calories),
      0,
    );

    let isToday = date.toDateString() === today.toDateString();

    container.innerHTML += `
      <div
        class="rounded-2xl p-4 text-center transition
        ${isToday ? "bg-indigo-100 border-2 border-indigo-400" : "bg-gray-50"}"
      >
        <p class="text-gray-500 text-sm">
          ${date.toLocaleDateString("en-US", {
            weekday: "short",
          })}
        </p>

        <p class="text-2xl font-bold mt-1">
          ${date.getDate()}
        </p>

        <p class="text-3xl font-bold mt-4 ${
          calories ? "text-emerald-600" : "text-gray-300"
        }">
          ${calories.toFixed(2)}
        </p>

        <p class="text-gray-400 text-sm">
          kcal
        </p>
      </div>
    `;
  }
}

function renderMealsPage() {
  allRecipesSection.classList.remove("hidden");
  mealCategoriesSection.classList.remove("hidden");
  searchFilterSection.classList.remove("hidden");
  mealDetailsSection.classList.add("hidden");
  foodLogSection.classList.add("hidden");
  productsSection.classList.add("hidden");

  h1InHeader.innerText = "Meals & Recipes";
  pInHeader.innerText =
    "Discover delicious and nutritious recipes tailored for you";
}

mealsRecipesLink.addEventListener("click", () => {
  renderMealsPage();
});

quickLogBtn.addEventListener("click", () => {
  renderMealsPage();
});

quickScanBtn.addEventListener("click", () => {
  renderScanProductPage();
});

productScannerLink.addEventListener("click", () => {
  renderScanProductPage();
});

function renderScanProductPage() {
  getCategoriesForProducts();
  allRecipesSection.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  searchFilterSection.classList.add("hidden");
  mealDetailsSection.classList.add("hidden");
  foodLogSection.classList.add("hidden");
  productsSection.classList.remove("hidden");

  h1InHeader.innerText = "Product Scanner";
  pInHeader.innerText = "Search packaged foods by name or barcode";
}

foodLogLink.addEventListener("click", () => {
  allRecipesSection.classList.add("hidden");
  mealCategoriesSection.classList.add("hidden");
  searchFilterSection.classList.add("hidden");
  mealDetailsSection.classList.add("hidden");
  foodLogSection.classList.remove("hidden");
  productsSection.classList.add("hidden");

  h1InHeader.innerText = "Food Log";
  pInHeader.innerText = "Track your daily nutrition and food intake";

  foodLogDate.innerText = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  renderLoggedMeals();
  updateTodayNutrition();
  renderWeeklyOverview();
});

function createProductCard(product) {
  return `
        <div
          class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
          data-barcode="${product.barcode}"
        >
          <div
            class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
          >
            <img
              class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              src="${product.image || "https://placehold.co/300x300?text=No+Image"}"
              alt="${product.name}"
              loading="lazy"
            />

${
  product.nutritionGrade === "unknown"
    ? `
      <div class="absolute top-2 left-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
        -
      </div>
    `
    : product.nutritionGrade
      ? `
      <div class="absolute top-2 left-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center uppercase">
        ${product.nutritionGrade}
      </div>
    `
      : ""
}

${
  product.novaGroup
    ? `
      <div class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
        ${product.novaGroup}
      </div>
    `
    : ""
}

          </div>

          <div class="p-4">

            <p class="text-xs text-emerald-600 font-semibold mb-1 truncate">
              ${product.brand || "Unknown Brand"}
            </p>

            <h3 class="font-bold text-gray-900 mb-2 line-clamp-2">
              ${product.name}
            </h3>

            <div class="flex items-center gap-3 text-xs text-gray-500 mb-3">
              <span>
                <i class="fa-solid fa-fire mr-1"></i>
                ${product.nutrients.calories.toFixed(2)} kcal
              </span>
            </div>

            <div class="grid grid-cols-4 gap-1 text-center">

              <div class="bg-emerald-50 rounded p-1.5">
                <p class="text-xs font-bold text-emerald-700">
                  ${product.nutrients.protein.toFixed(2)}g
                </p>
                <p class="text-[10px] text-gray-500">Protein</p>
              </div>

              <div class="bg-blue-50 rounded p-1.5">
                <p class="text-xs font-bold text-blue-700">
                  ${product.nutrients.carbs.toFixed(2)}g
                </p>
                <p class="text-[10px] text-gray-500">Carbs</p>
              </div>

              <div class="bg-purple-50 rounded p-1.5">
                <p class="text-xs font-bold text-purple-700">
                  ${product.nutrients.fat.toFixed(2)}g
                </p>
                <p class="text-[10px] text-gray-500">Fat</p>
              </div>

              <div class="bg-orange-50 rounded p-1.5">
                <p class="text-xs font-bold text-orange-700">
                  ${product.nutrients.sugar.toFixed(2)}g
                </p>
                <p class="text-[10px] text-gray-500">Sugar</p>
              </div>

            </div>

          </div>
        </div>
    `;
}

function renderProducts(products) {
  searchedProducts = products;

  productsCount.textContent = `Found ${products.length} products${
    currentSearchText ? ` for "${currentSearchText}"` : ""
  }`;

  productsGrid.innerHTML = products.map(createProductCard).join("");
}

function showEmptyProducts(message = "No products to display") {
  productsCount.textContent = "Found 0 products";

  productsGrid.innerHTML = `
    <div class="col-span-full flex justify-center py-12">
      <div class="flex flex-col items-center text-center">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-box-open text-2xl text-gray-400"></i>
        </div>

        <p class="text-gray-500 text-lg">${message}</p>

        <p class="text-gray-400 text-sm mt-2">
          Search for a product or browse by category
        </p>
      </div>
    </div>
  `;
}

searchProductBtn.addEventListener("click", async () => {
  let productResult = productSearchInput.value.trim();

  if (!productResult) {
    showEmptyProducts();
    return;
  }

  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/search?q=${productResult}&page=1&limit=24`,
  );

  let data = await response.json();

  if (!data.results || data.results.length === 0) {
    showEmptyProducts();
    return;
  }

  allProducts = data.results;
  searchedProducts = data.results;

  renderProducts(data.results, productResult);
});

lookupBarcodeBtn.addEventListener("click", async () => {
  let barcode = barcodeInput.value.trim();

  if (!barcode) {
    showEmptyProducts();
    return;
  }

  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`,
  );

  let data = await response.json();

  if (!data.results || data.results.length === 0) {
    showEmptyProducts();
    return;
  }

  allProducts = data.results;
  searchedProducts = data.results;

  renderProducts(data.results, barcode);
});
let nutriFilters = document.querySelectorAll(".nutri-score-filter");

nutriFilters.forEach((button) => {
  button.addEventListener("click", () => {
    nutriFilters.forEach((btn) => {
      btn.classList.remove("bg-emerald-600", "text-white");
    });

    button.classList.add("bg-emerald-600", "text-white");

    let grade = button.dataset.grade;

    if (!grade) {
      renderProducts(allProducts);
      return;
    }

    let filtered = allProducts.filter((product) => {
      return product.nutritionGrade?.toLowerCase() === grade;
    });

    renderProducts(filtered);
  });
});

productsGrid.addEventListener("click", (e) => {
  let card = e.target.closest(".product-card");

  if (!card) return;

  let barcode = card.dataset.barcode;

  selectedProduct = searchedProducts.find((item) => item.barcode === barcode);

  if (!selectedProduct) return;

  document.getElementById("modal-image").src = selectedProduct.image;
  document.getElementById("modal-brand").textContent =
    selectedProduct.brand || "Unknown Brand";

  document.getElementById("modal-name").textContent = selectedProduct.name;

  document.getElementById("modal-grade").textContent =
    selectedProduct.nutritionGrade === "unknown"
      ? "-"
      : selectedProduct.nutritionGrade.toUpperCase();

  document.getElementById("modal-nova").textContent =
    selectedProduct.novaGroup || "-";

  document.getElementById("modal-calories").textContent =
    selectedProduct.nutrients.calories.toFixed(0);

  document.getElementById("modal-protein").textContent =
    selectedProduct.nutrients.protein.toFixed(1) + "g";

  document.getElementById("modal-carbs").textContent =
    selectedProduct.nutrients.carbs.toFixed(1) + "g";

  document.getElementById("modal-fat").textContent =
    selectedProduct.nutrients.fat.toFixed(1) + "g";

  document.getElementById("modal-sugar").textContent =
    selectedProduct.nutrients.sugar.toFixed(1) + "g";

  foodModal.classList.remove("hidden");
  foodModal.classList.add("flex");
});

logFoodBtn.addEventListener("click", () => {
  if (!selectedProduct) return;

  let loggedMeals = JSON.parse(localStorage.getItem("loggedMeals")) || [];

  loggedMeals.push({
    ...selectedProduct,
    loggedAt: new Date().toLocaleString(),
  });

  localStorage.setItem("loggedMeals", JSON.stringify(loggedMeals));

  foodModal.classList.add("hidden");
  foodModal.classList.remove("flex");
});

async function getCategoriesForProducts() {
  let response = await fetch(
    "https://nutriplan-api.vercel.app/api/products/categories",
  );

  let data = await response.json();

  console.log(data.results);

  productCategories.innerHTML = data.results
    .map((category, index) => {
      let style = categoryStylesProducts[index % categoryStylesProducts.length];

      return `
        <button
          class="product-category-btn px-4 py-2 ${style.bg} rounded-lg text-sm font-medium whitespace-nowrap transition-all"
          data-category="${category.name}"
        >
          <i class="fa-solid ${style.icon} mr-1.5"></i>${category.name}
        </button>
      `;
    })
    .join("");
}

async function getAllAreas() {
  let response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/areas",
  );

  let data = await response.json();

  let areasContainer = document.getElementById("areasContainer");

  data.results.forEach((area) => {
    areasContainer.innerHTML += `<button
              class="area-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${area.name}
            </button>`;
  });

  document.querySelectorAll(".area-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(btn.innerText);

      filterMeals("area", btn.innerText);
    });
  });
}

async function getAllCategories() {
  let response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/categories",
  );
  let data = await response.json();

  let categoriesContainer = document.getElementById("categories-grid");

  data.results.forEach((category) => {
    let style = categoryStyles[category.name];
    categoriesContainer.innerHTML += `
    <div
      class="category-card bg-gradient-to-br ${style.card} rounded-xl p-3 border ${style.border} hover:shadow-md cursor-pointer transition-all group"
      data-category="${category.name}"
    >
      <div class="flex items-center gap-2.5">
        <div
          class="text-white w-9 h-9 bg-gradient-to-br ${style.iconBg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
        >
          <i class="${style.icon}"></i>
        </div>
        <div>
          <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
        </div>
      </div>
    </div>
  `;

    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        console.log(card.dataset.category);

        filterMeals("category", card.dataset.category);
      });
    });
  });
}

async function getMealById() {
  document.querySelectorAll(".recipe-card").forEach((card) => {
    card.addEventListener("click", async () => {
      let response = await fetch(
        `https://nutriplan-api.vercel.app/api/meals/${card.dataset.mealId}`,
      );
      let data = await response.json();
      console.log(data);

      let responseCalories = await fetch(
        "https://nutriplan-api.vercel.app/api/nutrition/analyze",
        {
          method: "POST",
          body: JSON.stringify({
            recipeName: data.result.name,
            ingredients: data.result.ingredients.map(
              (item) => `${item.measure} ${item.ingredient}`,
            ),
          }),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "3DNlXIP2OYJbqeQzRp6RToV7EtEY9QmNagMpyFAo",
          },
        },
      );

      let dataCalories = await responseCalories.json();
      console.log("ssss", dataCalories.data);

      console.log(data.result);
      allRecipesSection.classList.add("hidden");
      mealCategoriesSection.classList.add("hidden");
      searchFilterSection.classList.add("hidden");
      mealDetailsSection.classList.remove("hidden");
      let videoUrl = data.result.youtube
        ? data.result.youtube.replace("watch?v=", "embed/")
        : "";

      mealDetailsSection.innerHTML = `
<div class="max-w-7xl mx-auto">

  <!-- Back Button -->
  <button
    id="back-to-meals-btn"
    class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
  >
    <i class="fa-solid fa-arrow-left"></i>
    <span >Back to Recipes</span>
  </button>

  <!-- Hero Section -->
  <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
    <div class="relative h-80 md:h-96">
      <img
        src="${data.result.thumbnail}"
        alt="${data.result.name}"
        class="w-full h-full object-cover"
      />

      <div
        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
      ></div>

      <div class="absolute bottom-0 left-0 right-0 p-8">
        <div class="flex items-center gap-3 mb-3">

          <span
            class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
          >
            ${data.result.category}
          </span>

          <span
            class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
          >
            ${data.result.area}
          </span>

    ${
      data.result.tags.length > 0
        ? data.result.tags
            .map(
              (tag) => `
            <span
              class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
            >
              ${tag}
            </span>
          `,
            )
            .join("")
        : ""
    }

        </div>

        <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
          ${data.result.name}
        </h1>

        <div class="flex items-center gap-6 text-white/90">

          <span class="flex items-center gap-2">
            <i class="fa-solid fa-clock"></i>
            <span>30 min</span>
          </span>

          <span class="flex items-center gap-2">
            <i class="fa-solid fa-utensils"></i>
            <span id="hero-servings">4 servings</span>
          </span>

          <span class="flex items-center gap-2">
            <i class="fa-solid fa-fire"></i>
            <span id="hero-calories">${dataCalories.data.perServing.calories} cal/serving</span>
          </span>

        </div>
      </div>
    </div>
  </div>

  <!-- Action Buttons -->
  <div class="flex flex-wrap gap-3 mb-8">
    <button
      id="log-meal-btn"
      class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
      data-meal-id="${data.result.id}"
    >
      <i class="fa-solid fa-clipboard-list"></i>
      <span>Log This Meal</span>
    </button>
  </div>

  <!-- Main Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

    <!-- Left Column -->
    <div class="lg:col-span-2 space-y-8">

      <!-- Ingredients -->
      <div class="bg-white rounded-2xl shadow-lg p-6">

        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-list-check text-emerald-600"></i>

          Ingredients

          <span class="text-sm font-normal text-gray-500 ml-auto">
            ${data.result.ingredients.length} items
          </span>

        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">

          ${data.result.ingredients
            .map(
              (ingredient) => `
            <div
              class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors"
            >

              <input
                type="checkbox"
                class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
              />

              <span class="text-gray-700">

                <span class="font-medium text-gray-900">
                  ${ingredient.measure}
                </span>

                ${ingredient.ingredient}

              </span>

            </div>
          `,
            )
            .join("")}

        </div>

      </div>

            <!-- Instructions -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
          Instructions
        </h2>

        <div class="space-y-4">

          ${data.result.instructions
            .map(
              (instruction, index) => `
            <div
              class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >

              <div
                class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0"
              >
                ${index + 1}
              </div>

              <p class="text-gray-700 leading-relaxed pt-2">
                ${instruction}
              </p>

            </div>
          `,
            )
            .join("")}

        </div>
      </div>

      <!-- Video Section -->
      <div class="bg-white rounded-2xl shadow-lg p-6">

        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-video text-red-500"></i>
          Video Tutorial
        </h2>

        <div
          class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
        >

          <iframe
            src="${videoUrl}"
            class="absolute inset-0 w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>

        </div>

      </div>

    </div>

    <!-- Right Column -->
    <div class="space-y-6">

      <!-- Nutrition Facts -->
      <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

        <h2
          class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
        >
          <i class="fa-solid fa-chart-pie text-emerald-600"></i>
          Nutrition Facts
        </h2>

        <div id="nutrition-facts-container">

          <p class="text-sm text-gray-500 mb-4">
            Per serving
          </p>

          <div
            class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
          >

            <p class="text-sm text-gray-600">
              Calories per serving
            </p>

            <p class="text-4xl font-bold text-emerald-600">
              ${dataCalories.data.perServing.calories}
            </p>

            <p class="text-xs text-gray-500 mt-1">
              Total: ${dataCalories.data.totals.calories} cal
            </p>

          </div>

          <div class="space-y-4">

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span class="text-gray-700">Protein</span>
              </div>

              <span class="font-bold text-gray-900">
                ${dataCalories.data.perServing.protein}g
              </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-emerald-500 h-2 rounded-full"
                style="width: ${calculateWidthPercentage(dataCalories.data.perServing.protein, dailyValues.protein)}%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                <span class="text-gray-700">Carbs</span>
              </div>

              <span class="font-bold text-gray-900">
                ${dataCalories.data.perServing.carbs}g
              </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-blue-500 h-2 rounded-full"
                style="width: ${calculateWidthPercentage(dataCalories.data.perServing.carbs, dailyValues.carbs)}%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                <span class="text-gray-700">Fat</span>
              </div>

              <span class="font-bold text-gray-900">
                ${dataCalories.data.perServing.fat}g
              </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-purple-500 h-2 rounded-full"
                style="width: ${calculateWidthPercentage(dataCalories.data.perServing.fat, dailyValues.fat)}%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                <span class="text-gray-700">Fiber</span>
              </div>

              <span class="font-bold text-gray-900">
                ${dataCalories.data.perServing.fiber}g
              </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-orange-500 h-2 rounded-full"
                style="width: ${calculateWidthPercentage(dataCalories.data.perServing.fiber, dailyValues.fiber)}%"
              ></div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                <span class="text-gray-700">Sugar</span>
              </div>

              <span class="font-bold text-gray-900">
                ${dataCalories.data.perServing.sugar}g
              </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-pink-500 h-2 rounded-full"
                style="width: ${calculateWidthPercentage(dataCalories.data.perServing.sugar, dailyValues.sugar)}%"
              ></div>
            </div>

             <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <span class="text-gray-700">Saturated Fat</span>
              </div>

              <span class="font-bold text-gray-900">
                ${dataCalories.data.perServing.saturatedFat}g
              </span>
            </div>

            <div class="w-full bg-gray-100 rounded-full h-2">
              <div
                class="bg-red-500 h-2 rounded-full"
                style="width: ${calculateWidthPercentage(dataCalories.data.perServing.saturatedFat, dailyValues.saturatedFat)}%"
              ></div>
            </div>

          </div>

                            <div class="mt-6 pt-6 border-t border-gray-100">

                    <h3 class="text-sm font-semibold text-gray-900 mb-3">
                      other
                    </h3>

                    <div class="grid grid-cols-2 gap-3 text-sm">

                      <div class="flex justify-between">
                        <span class="text-gray-600">Cholesterol</span>
                        <span class="font-medium">${dataCalories.data.perServing.cholesterol}mg</span>
                      </div>

                      <div class="flex justify-between">
                        <span class="text-gray-600">Sodium</span>
                        <span class="font-medium">${dataCalories.data.perServing.sodium}mg</span>
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
`;

      let backToMealsBtn = document.getElementById("back-to-meals-btn");

      backToMealsBtn.addEventListener("click", () => {
        allRecipesSection.classList.remove("hidden");
        mealCategoriesSection.classList.remove("hidden");
        searchFilterSection.classList.remove("hidden");
        mealDetailsSection.classList.add("hidden");
      });

      let logMealBtn = document.getElementById("log-meal-btn");
      let modalImg = document.getElementById("modalMealImage");
      let modalMealName = document.getElementById("modalMealName");
      let plusServingBtn = document.getElementById("plusServing");
      let minusServingBtn = document.getElementById("minusServing");
      let servingsInput = document.getElementById("servingsInput");
      let modalCalories = document.getElementById("modalCalories");
      let modalProtein = document.getElementById("modalProtein");
      let modalCarbs = document.getElementById("modalCarbs");
      let modalFat = document.getElementById("modalFat");
      let cancelModalBtn = document.getElementById("cancelModal");
      let confirmLogMealBtn = document.getElementById("confirmLogMeal");
      let successDescriptionLogged =
        document.getElementById("successDescription");
      let successCalories = document.getElementById("successCalories");
      let closeModal = document.getElementById("closeModal");

      modalImg.src = data.result.thumbnail;
      modalMealName.textContent = data.result.name;
      modalCalories.textContent = `${dataCalories.data.perServing.calories}`;
      modalProtein.textContent = `${dataCalories.data.perServing.protein}g`;
      modalCarbs.textContent = `${dataCalories.data.perServing.carbs}g`;
      modalFat.textContent = `${dataCalories.data.perServing.fat}g`;

      logMealBtn.addEventListener("click", () => {
        logMealModal.classList.remove("hidden");
        logMealModal.classList.add("flex");
      });

      cancelModalBtn.addEventListener("click", () => {
        logMealModal.classList.remove("flex");
        logMealModal.classList.add("hidden");
      });

      closeModal.addEventListener("click", () => {
        logMealModal.classList.remove("flex");
        logMealModal.classList.add("hidden");
      });

      confirmLogMealBtn.onclick = () => {
        let servings = parseFloat(servingsInput.value);

        let totalCalories = dataCalories.data.perServing.calories * servings;
        let totalProtein = dataCalories.data.perServing.protein * servings;
        let totalCarbs = dataCalories.data.perServing.carbs * servings;
        let totalFat = dataCalories.data.perServing.fat * servings;

        let mealLog = {
          name: data.result.name,
          image: data.result.thumbnail,
          servings: servings,
          calories: totalCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat,
          loggedAt: new Date().toISOString(),
        };

        let loggedMeals = JSON.parse(localStorage.getItem("loggedMeals")) || [];
        loggedMeals.push(mealLog);
        localStorage.setItem("loggedMeals", JSON.stringify(loggedMeals));

        successDescriptionLogged.textContent = `${data.result.name} (${servings} serving${servings > 1 ? "s" : ""}) has been added to your daily log.`;

        successCalories.textContent = `+${totalCalories} calories`;

        // Close log meal modal
        logMealModal.classList.remove("flex");
        logMealModal.classList.add("hidden");

        // Show success modal
        successModal.classList.remove("hidden");
        successModal.classList.add("flex");

        setTimeout(() => {
          successModal.classList.remove("flex");
          successModal.classList.add("hidden");
        }, 2000);
      };
      plusServingBtn.addEventListener("click", () => {
        let currentValue = parseFloat(servingsInput.value);
        servingsInput.value = currentValue + 0.5;
      });

      minusServingBtn.addEventListener("click", () => {
        let currentValue = parseFloat(servingsInput.value);
        if (currentValue > 0.5) {
          servingsInput.value = currentValue - 0.5;
        }
      });
    });
  });
}

searchInput.addEventListener("input", async () => {
  console.log("hi");

  let query = searchInput.value.trim();

  if (!query) {
    getAllMeals();
    return;
  }

  await searchMeals(query);
});

async function searchMeals(query) {
  mealsContainer.innerHTML = `
    <div class="col-span-full flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    </div>
  `;
  let urls = [
    `https://nutriplan-api.vercel.app/api/meals/filter?category=${query}&page=1&limit=25`,
    `https://nutriplan-api.vercel.app/api/meals/filter?area=${query}&page=1&limit=25`,
    `https://nutriplan-api.vercel.app/api/meals/filter?ingredient=${query}&page=1&limit=25`,
  ];

  let responses = await Promise.all(
    urls.map(async (url) => {
      try {
        let res = await fetch(url);
        return await res.json();
      } catch {
        return { results: [] };
      }
    }),
  );

  let meals = responses.flatMap((response) => response.results || []);

  meals = meals.filter(
    (meal, index, self) => index === self.findIndex((m) => m.id === meal.id),
  );

  displayMeals(meals);
}

function displayMeals(meals) {
  if (!meals.length) {
    mealsContainer.innerHTML = `
      <div class="col-span-full flex justify-center py-12">
        <div class="text-center">
          <i class="fa-solid fa-utensils text-5xl text-gray-300 mb-4"></i>
          <h3 class="text-xl font-semibold text-gray-600">
            No meals found
          </h3>
          <p class="text-gray-400">
            Try another search.
          </p>
        </div>
      </div>
    `;
    return;
  }

  mealsContainer.innerHTML = meals
    .map(
      (meal) => `
      <div
        class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
        data-meal-id="${meal.id}"
      >
        <div class="relative h-48 overflow-hidden">
          <img
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            src="${meal.thumbnail}"
            alt="${meal.name}"
          />

          <div class="absolute bottom-3 left-3 flex gap-2">
            <span class="px-2 py-1 bg-white/90 text-xs font-semibold rounded-full">
              ${meal.category}
            </span>

            <span class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white">
              ${meal.area}
            </span>
          </div>
        </div>

        <div class="p-4">
          <h3 class="text-base font-bold mb-1">${meal.name}</h3>

          <p class="text-xs text-gray-600 mb-3 line-clamp-2">
            ${meal.instructions}
          </p>

          <div class="flex justify-between text-xs">
            <span>${meal.category}</span>
            <span>${meal.area}</span>
          </div>
        </div>
      </div>
      `,
    )
    .join("");

  getMealById();
}

async function getAllMeals() {
  let response = await fetch(
    "https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25",
  );
  let data = await response.json();

  let mealsContainer = document.getElementById("recipes-grid");
  displayMeals(data.results);

  getMealById();
}

async function filterMeals(filterType, filterValue) {
  let mealsContainer = document.getElementById("recipes-grid");
  mealsContainer.innerHTML = `<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>`;
  let response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/filter?${filterType}=${filterValue}&page=1&limit=25`,
  );
  let data = await response.json();
  mealsContainer.innerHTML = "";
  if (data.results.length === 0) {
    mealsContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
  } else {
    data.results.forEach((meal) => {
      mealsContainer.innerHTML += `<div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="${meal.name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meal.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>`;
    });

    getMealById();
  }
}

getAllAreas();
getAllCategories();
getAllMeals();
