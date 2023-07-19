import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FlowerOrder, FlowerOrders } from "../types/FlowerOrder";

interface OrderModalProps {
  closeModal: () => void;
  flowerOrders: FlowerOrders;
  setFlowerOrders: Dispatch<SetStateAction<FlowerOrders>>;
}

export const OrderModal = ({
  closeModal,
  flowerOrders,
  setFlowerOrders,
}: OrderModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const flowerRef = useRef<HTMLInputElement>(null);
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
    let flowersPerBunch = Number(flowerRef!.current!.value);
    let pricePerBunch = Number(priceRef!.current!.value);

    // Need to check if order already exists!

    // Check if all fields are filled out correctly

    if (!name || !flowersPerBunch || !pricePerBunch) {
      alert(
        "Please enter all fields. Flowers per Bunch and Price per Bunch must be numbers."
      );
      return;
    }

    if (flowersPerBunch <= 0 || pricePerBunch <= 0) {
      alert("Flowers per Bunch and Price per Bunch must be greater than 0.");
      return;
    }

    if (!Number.isInteger(flowersPerBunch)) {
      alert("Flowers per Bunch must be a whole number.");
      return;
    }

    // Round price
    pricePerBunch = Number(pricePerBunch.toFixed(2));

    const newFlowerOrder: FlowerOrder = {
      flowersPerBunch,
      pricePerBunch,
    };

    const updatedOrders = { ...flowerOrders };
    updatedOrders[name] = newFlowerOrder;
    localStorage.setItem("flowerOrders", JSON.stringify(updatedOrders));
    setFlowerOrders(updatedOrders);

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
            <span className="label-text text-white">Name of Flower</span>
          </label>
          <label className="input-group">
            <span>Name</span>
            <input
              type="text"
              ref={nameRef}
              placeholder="ie. Red Rose"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="form-control mb-4 m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Flowers per Bunch</span>
          </label>
          <label className="input-group">
            <span>Stems</span>
            <input
              type="text"
              ref={flowerRef}
              placeholder="ie. 12"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="form-control m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Price per Bunch ($)</span>
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
            Add Flower
          </button>
        </div>
      </div>
    </div>
  );
};
