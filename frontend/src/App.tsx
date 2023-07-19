import { useEffect, useState } from "react";

import "./App.css";
import { RecipeDisplay } from "./components/RecipeDisplay";
import { RecipeModal } from "./components/RecipeModal";
import { OrderModal } from "./components/FlowerOrderModal";
import { ShoppingListDisplay } from "./components/ShoppingListDisplay";
import { Recipe } from "./types/Recipe";
import { FlowerOrders } from "./types/FlowerOrder";
import { ShoppingList, ShoppingListItem } from "./types/ShoppingListItem";

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [flowerOrders, setFlowerOrders] = useState<FlowerOrders>({});
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingList>({});
  console.log("floral orders", flowerOrders);
  console.log("recipes", recipes);

  // Fetches saved recipes and plant orders
  useEffect(() => {
    const savedRecipesJson = localStorage.getItem("recipes");
    let savedRecipes: Recipe[] = [];

    const savedFlowerOrdersJson = localStorage.getItem("flowerOrders");
    let savedFlowerOrders: FlowerOrders = {};

    // Fetch saved Recipes
    if (savedRecipesJson) {
      try {
        savedRecipes = JSON.parse(savedRecipesJson) as Recipe[];
        setRecipes(savedRecipes);
      } catch (error) {
        console.error("Error parsing saved recipes:", error);
      }
    }
    if (savedRecipes) {
      setRecipes(savedRecipes);
    }

    // Fetch saved Plant Orders
    if (savedFlowerOrdersJson) {
      try {
        savedFlowerOrders = JSON.parse(savedFlowerOrdersJson) as FlowerOrders;
        setFlowerOrders(savedFlowerOrders);
      } catch (error) {
        console.error("Error parsing saved plant orders:", error);
      }
    }
    if (savedFlowerOrders) {
      setFlowerOrders(savedFlowerOrders);
    }
  }, []);

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const closeRecipeModal = () => {
    setShowRecipeModal(false);
  };

  const calculate = () => {
    console.log("Called calculate");
    if (!recipes) {
      alert("There are no recipes defined");
      return;
    }

    let missingPlantsAlert =
      "The following plants included in recipes have not been defined in a plant order:";
    let missingPlants = false;

    let newShoppingList = {} as ShoppingList;

    for (let recipe of recipes) {
      for (let ingredient of recipe.ingredients) {
        // Check if all recipe ingredients are in FlowerOrders
        if (!flowerOrders[ingredient.name]) {
          missingPlants = true;
          missingPlantsAlert += ` ${ingredient.name},`;
        }

        // Aggregate data to shopping list
        else {
          // Make new shopping list item
          if (!newShoppingList[ingredient.name]) {
            let newItem = {} as ShoppingListItem;
            newItem.quantity = 0;
            newItem.bunchesToOrder = 0;
            newItem.flowersPerBunch =
              flowerOrders[ingredient.name].flowersPerBunch;
            newItem.pricePerBunch = flowerOrders[ingredient.name].pricePerBunch;
            newShoppingList[ingredient.name] = newItem;
          }

          // Modify shopping list item
          newShoppingList[ingredient.name].quantity += Number(
            ingredient.quantity
          );
          let quantity = newShoppingList[ingredient.name].quantity;
          let flowersPerBunch =
            newShoppingList[ingredient.name].flowersPerBunch;

          // Calculate how many units to order and total cost
          let bunchesToOrder = Math.ceil(quantity / flowersPerBunch);
          let totalCost =
            bunchesToOrder * newShoppingList[ingredient.name].pricePerBunch;

          newShoppingList[ingredient.name].bunchesToOrder = bunchesToOrder;
          newShoppingList[ingredient.name].totalCost = totalCost;
        }
      }
    }

    console.log(newShoppingList);
    setShoppingList(newShoppingList);

    if (missingPlants) {
      // Replace last , with a .
      let split = missingPlantsAlert.split("");
      split.splice(split.length - 1, 1, ".");
      missingPlantsAlert = split.join("");
      alert(missingPlantsAlert);
    }
  };

  return (
    <div className="App flex w-full flex-col">
      <h1 className="text-5xl my-12">Floral Shopping List Calculator</h1>

      <button
        className="btn glass bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowOrderModal(!showOrderModal)}
      >
        Define Flower Order
      </button>

      <button
        className="btn glass mt-8 bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowRecipeModal(!showRecipeModal)}
      >
        Define Floral Recipe
      </button>

      {showOrderModal && (
        <OrderModal
          closeModal={closeOrderModal}
          flowerOrders={flowerOrders}
          setFlowerOrders={setFlowerOrders}
        />
      )}
      {showRecipeModal && (
        <RecipeModal
          closeModal={closeRecipeModal}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      )}
      {recipes.length > 0 && (
        <RecipeDisplay recipes={recipes} calculate={calculate} />
      )}
      {shoppingList && <ShoppingListDisplay list={shoppingList} />}
    </div>
  );
}

export default App;
