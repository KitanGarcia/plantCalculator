import { useEffect, useState } from "react";

import "./App.css";
import { ArrangementDisplay } from "./components/ArrangementDisplay";
import { ArrangementModal } from "./components/ArrangementModal";
import { OrderModal } from "./components/OrderModal";
import { ShoppingListDisplay } from "./components/ShoppingListDisplay";
import { Arrangement } from "./types/Arrangement";
import { PlantOrders } from "./types/PlantOrder";
import { ShoppingList, ShoppingListItem } from "./types/ShoppingListItem";

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showArrangementModal, setShowArrangementModal] = useState(false);
  const [plantOrders, setPlantOrders] = useState<PlantOrders>({});
  const [arrangements, setArrangements] = useState<Array<Arrangement>>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingList>({});
  console.log("plant orders", plantOrders);
  console.log("arrangements", arrangements);

  // Fetches saved arrangements and plant orders
  useEffect(() => {
    const savedArrangementsJson = localStorage.getItem("arrangements");
    let savedArrangements: Arrangement[] = [];

    const savedPlantOrdersJson = localStorage.getItem("plantOrders");
    let savedPlantOrders: PlantOrders = {};

    // Fetch saved Arrangements
    if (savedArrangementsJson) {
      try {
        savedArrangements = JSON.parse(savedArrangementsJson) as Arrangement[];
        setArrangements(savedArrangements);
      } catch (error) {
        console.error("Error parsing saved arrangements:", error);
      }
    }
    if (savedArrangements) {
      setArrangements(savedArrangements);
    }

    // Fetch saved Plant Orders
    if (savedPlantOrdersJson) {
      try {
        savedPlantOrders = JSON.parse(savedPlantOrdersJson) as PlantOrders;
        setPlantOrders(savedPlantOrders);
      } catch (error) {
        console.error("Error parsing saved plant orders:", error);
      }
    }
    if (savedPlantOrders) {
      setPlantOrders(savedPlantOrders);
    }
  }, []);

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const closeArrangementModal = () => {
    setShowArrangementModal(false);
  };

  const calculate = () => {
    console.log("Called calculate");
    if (!arrangements) {
      alert("There are no arrangements defined");
      return;
    }

    let missingPlantsAlert =
      "The following plants included in arrangements have not been defined in a plant order:";
    let missingPlants = false;

    let newShoppingList = {} as ShoppingList;

    for (let arrangement of arrangements) {
      for (let ingredient of arrangement.ingredients) {
        // Check if all arrangement ingredients are in PlantOrders
        if (!plantOrders[ingredient.name]) {
          missingPlants = true;
          missingPlantsAlert += ` ${ingredient.name},`;
        }

        // Aggregate data to shopping list
        else {
          // Make new shopping list item
          if (!newShoppingList[ingredient.name]) {
            let newItem = {} as ShoppingListItem;
            newItem.quantity = 0;
            newItem.unitsToOrder = 0;
            newItem.plantsPerUnit = plantOrders[ingredient.name].plantsPerUnit;
            newItem.pricePerUnit = plantOrders[ingredient.name].pricePerUnit;
            newShoppingList[ingredient.name] = newItem;
          }

          // Modify shopping list item
          newShoppingList[ingredient.name].quantity += Number(
            ingredient.quantity
          );
          let quantity = newShoppingList[ingredient.name].quantity;
          let plantsPerUnit = newShoppingList[ingredient.name].plantsPerUnit;

          // Calculate how many units to order and total cost
          let unitsToOrder = Math.ceil(quantity / plantsPerUnit);
          let totalCost =
            unitsToOrder * newShoppingList[ingredient.name].pricePerUnit;

          newShoppingList[ingredient.name].unitsToOrder = unitsToOrder;
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
      <h1 className="text-5xl my-12">Plant Calculator</h1>

      <button
        className="btn glass bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowOrderModal(!showOrderModal)}
      >
        Define Flower Order
      </button>

      <button
        className="btn glass mt-8 bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowArrangementModal(!showArrangementModal)}
      >
        Define Floral Recipe
      </button>

      {showOrderModal && (
        <OrderModal
          closeModal={closeOrderModal}
          plantOrders={plantOrders}
          setPlantOrders={setPlantOrders}
        />
      )}
      {showArrangementModal && (
        <ArrangementModal
          closeModal={closeArrangementModal}
          arrangements={arrangements}
          setArrangements={setArrangements}
        />
      )}
      {arrangements.length > 0 && (
        <ArrangementDisplay arrangements={arrangements} calculate={calculate} />
      )}
      {shoppingList && <ShoppingListDisplay list={shoppingList} />}
    </div>
  );
}

export default App;
