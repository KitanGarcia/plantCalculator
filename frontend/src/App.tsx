import React, { useState } from "react";

import "./App.css";
import { ArrangementModal } from "./components/ArrangementModal";
import { OrderModal } from "./components/OrderModal";
import { PlantOrder } from "./types/PlantOrder";

function App() {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showArrangementModal, setShowArrangementModal] = useState(false);
  const [plantOrderDetails, setPlantOrderDetails] = useState<Array<PlantOrder>>(
    []
  );
  console.log(plantOrderDetails);

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const closeArrangementModal = () => {
    setShowArrangementModal(false);
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
          plantOrderDetails={plantOrderDetails}
          setPlantOrderDetails={setPlantOrderDetails}
        />
      )}
      {showArrangementModal && (
        <ArrangementModal closeModal={closeArrangementModal} />
      )}
    </div>
  );
}

export default App;
