import React, { useState } from "react";

import "./App.css";
import { PurchaseModal } from "./components/PurchaseModal";

function App() {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [plantPurchaseDetails, setPlantPurchaseDetails] = useState({});

  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
  };

  return (
    <div className="App flex w-full flex-col">
      <h1 className="text-5xl my-12">Plant Purchase Calculator</h1>

      <button
        className="btn glass bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto"
        onClick={() => setShowPurchaseModal(!showPurchaseModal)}
      >
        Define Plant Purchase
      </button>

      {showPurchaseModal && <PurchaseModal closeModal={closePurchaseModal} />}
    </div>
  );
}

export default App;
