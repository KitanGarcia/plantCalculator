import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { PlantOrder } from "../types/PlantOrder";

interface OrderModalProps {
  closeModal: () => void;
  plantOrderDetails: Array<PlantOrder>;
  setPlantOrderDetails: Dispatch<SetStateAction<PlantOrder[]>>;
}

export const OrderModal = ({
  closeModal,
  plantOrderDetails,
  setPlantOrderDetails,
}: OrderModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const plantsRef = useRef<HTMLInputElement>(null);
  const unitsRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  // Focus on name when modal opens
  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef]);

  const handleAddPlant = async () => {
    // Remove whitespace of plant and make lowercase for storing
    let name = nameRef!.current!.value.replace(/\s/g, "").toLowerCase();
    let plantsPerUnit = Number(plantsRef!.current!.value);
    let numberOfUnits = Number(unitsRef!.current!.value);
    let pricePerUnit = Number(priceRef!.current!.value);

    // Need to check if order already exists!

    // Check if all fields are filled out correctly

    if (!name || !plantsPerUnit || !numberOfUnits || !pricePerUnit) {
      alert(
        "Please enter all fields. Plants per Unit, Number of Units, and Price per Unit must be numbers."
      );
      return;
    }

    if (plantsPerUnit <= 0 || numberOfUnits <= 0 || pricePerUnit <= 0) {
      alert(
        "Plants per Unit, Number of Units, and Price per Unit must be greater than 0."
      );
      return;
    }

    if (!Number.isInteger(plantsPerUnit) || !Number.isInteger(numberOfUnits)) {
      alert("Plants per Unit and Number of Units must be whole numbers.");
      return;
    }

    // Round price
    pricePerUnit = Number(pricePerUnit.toFixed(2));

    const newPlantOrder = {
      name: name,
      plantsPerUnit,
      numberOfUnits,
      pricePerUnit,
    };

    const updatedOrderDetails = [...plantOrderDetails, newPlantOrder];
    setPlantOrderDetails(updatedOrderDetails);

    // set loading
    // save to db
    // end loading
    closeModal();
  };

  return (
    <div>
      <div className="w-[36rem] m-auto mt-8 menu rounded-box glass hover:bg-pink-500 bg-pink-500">
        <div className="form-control mt-4 mb-4 m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Name of Plant</span>
          </label>
          <label className="input-group">
            <span>Name</span>
            <input
              type="text"
              ref={nameRef}
              placeholder="ie. Red Roses"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="form-control mb-4 m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Plants per Unit</span>
          </label>
          <label className="input-group">
            <span>Plants</span>
            <input
              type="text"
              ref={plantsRef}
              placeholder="ie. 12"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="form-control mb-4 m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Number of Units</span>
          </label>
          <label className="input-group">
            <span>Units</span>
            <input
              type="text"
              ref={unitsRef}
              placeholder="ie. 1"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="form-control m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Price per Unit ($)</span>
          </label>
          <label className="input-group">
            <span>Price</span>
            <input
              type="text"
              ref={priceRef}
              placeholder="ie. 80.00"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="flex mb-4 mt-4 justify-between mx-2">
          <button
            className="btn hover:bg-red-600 glass w-1/5 bg-red-600 text-white"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="btn hover:bg-green-600 glass w-1/5 bg-green-600 text-white"
            onClick={handleAddPlant}
          >
            Add Plant
          </button>
        </div>
      </div>
    </div>
  );
};
