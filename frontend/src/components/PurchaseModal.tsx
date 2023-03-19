import { MouseEventHandler } from "react";

interface PurchaseModalProps {
  closeModal: () => void;
}

export const PurchaseModal = ({ closeModal }: PurchaseModalProps) => {
  const handleAddPlant = async () => {
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
              placeholder="ie. 1"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="form-control mb-4 m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Price per Unit ($)</span>
          </label>
          <label className="input-group">
            <span>Price</span>
            <input
              type="text"
              placeholder="ie. 80.00"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        <div className="flex mb-4 justify-between mx-2">
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
