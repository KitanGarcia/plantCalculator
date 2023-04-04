import { useState } from "react";

import "./App.css";
import { ArrangementDisplay } from "./components/ArrangementDisplay";
import { ArrangementModal } from "./components/ArrangementModal";
import { OrderModal } from "./components/OrderModal";
import { Arrangement } from "./types/Arrangement";
import { PlantOrders } from "./types/PlantOrder";

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showArrangementModal, setShowArrangementModal] = useState(false);
  const [plantOrders, setPlantOrders] = useState<PlantOrders>({});
  const [arrangements, setArrangements] = useState<Array<Arrangement>>([]);
  console.log("plant orders", plantOrders);
  console.log("arrangements", arrangements);

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const closeArrangementModal = () => {
    setShowArrangementModal(false);
  };

  const calculateCosts = () => {
    if (!arrangements) {
      alert("There are no arrangements defined");
      return;
    }

    // Check if all arrangement ingredients are in PlantOrders
  };

  return (
    <div className="App flex w-full flex-col">
      <h1 className="text-5xl my-12">Plant Calculator</h1>

      <button
        className="btn glass bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowOrderModal(!showOrderModal)}
      >
        Define Plant Order
      </button>

      <button
        className="btn glass mt-8 bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowArrangementModal(!showArrangementModal)}
      >
        Define Plant Arrangement
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
        <ArrangementDisplay arrangements={arrangements} />
      )}
    </div>
  );
}

export default App;
