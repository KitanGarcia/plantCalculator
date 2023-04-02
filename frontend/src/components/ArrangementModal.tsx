import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Arrangement, Ingredient } from "../types/Arrangement";
import { ArrangementRow } from "./ArrangementRow";

export const ArrangementModal = () => {
  const [ingredients, setIngredients] = useState<Array<Ingredient>>([
    {
      plant: "",
      quantity: 0,
    },
  ]);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus on name when modal opens
  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.focus();
    }
  }, [nameRef]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const ingredientList: Ingredient[] = [...ingredients];
    const { name, value } = event.target;

    // Create copy of values and over-write name key with value
    const ingredientToUpdate = { ...ingredientList[index], [name]: value };
    ingredientList[index] = ingredientToUpdate;
    console.log(ingredientList);
    setIngredients(ingredientList);
  };

  const handleAddArrangement = async () => {
    // Remove whitespace of arrangement and make lowercase for storing
    let name = nameRef!.current!.value.replace(/\s/g, "").toLowerCase();

    // Check if an arrangement already exists

    // Make sure at least 1 ingredient has been added

    // Check if plant has already been added

    // Check that number quantity is not 0

    // Filter ingredients to only use complete rows
  };

  // Create new row
  const handleAddRow = () => {
    setIngredients([...ingredients, { plant: "", quantity: 0 }]);
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
        {ingredients.map((_, index) => (
          <ArrangementRow index={index} handleInputChange={handleInputChange} />
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
            Add Arrangement
          </button>
        </div>
      </div>
    </div>
  );
};
