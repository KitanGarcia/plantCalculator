import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { PlantOrder } from "../types/PlantOrder";
import { ArrangementRow } from "./ArrangementRow";

export const ArrangementModal = () => {
  const [numRows, setNumRows] = useState(1);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus on name when modal opens
  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef]);

  const handleAddArrangement = async () => {
    // Remove whitespace of arrangement and make lowercase for storing
    let name = nameRef!.current!.value.replace(/\s/g, "").toLowerCase();
  };

  // Create new row
  const handleAddRow = () => {
    setNumRows(numRows + 1);
  };

  return (
    <div>
      <div className="w-[36rem] m-auto mt-8 menu rounded-box glass hover:bg-pink-500 bg-pink-500">
        <div className="form-control mt-4 mb-4 m-auto text-center">
          <label className="label">
            <span className="label-text text-white">Name of Arrangement</span>
          </label>
          <label className="input-group">
            <span>Name</span>
            <input
              type="text"
              ref={nameRef}
              placeholder="ie. Garden Party"
              className="input input-bordered focus:outline-none focus:border-blue-400"
            />
          </label>
        </div>
        {Array.from({ length: numRows }).map((row) => (
          <ArrangementRow />
        ))}

        <div>
          <button
            className="btn mb-4 hover:bg-indigo-600 glass w-1/5 bg-indigo-600 text-white"
            onClick={handleAddRow}
          >
            Add Row
          </button>
        </div>
        <div className="flex mb-4 justify-between mx-2">
          <button className="btn hover:bg-red-600 glass w-1/5 bg-red-600 text-white">
            Cancel
          </button>
          <button
            className="btn hover:bg-green-600 glass w-1/5 bg-green-600 text-white"
            onClick={handleAddArrangement}
          >
            Add Plant
          </button>
        </div>
      </div>
    </div>
  );
};
