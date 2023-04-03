import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Arrangement, Ingredient } from "../types/Arrangement";
import { ArrangementRow } from "./ArrangementRow";

interface ArrangementModalProps {
  closeModal: () => void;
  arrangements: Arrangement[];
  setArrangements: Dispatch<SetStateAction<Arrangement[]>>;
}

export const ArrangementModal = ({
  closeModal,
  arrangements,
  setArrangements,
}: ArrangementModalProps) => {
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
    let { name, value } = event.target;

    // Remove whitespace of arrangement and make lowercase for storing
    value = value.replace(/\s/g, "").toLowerCase();

    // Round up quantity
    // Assumes plant will never just be a number
    if (Number(value)) {
      value = `${Math.ceil(Number(value))}`;
    }

    // Create copy of values and over-write name key with value
    const ingredientToUpdate = { ...ingredientList[index], [name]: value };
    ingredientList[index] = ingredientToUpdate;
    setIngredients(ingredientList);
  };

  const handleAddArrangement = async () => {
    // Remove whitespace of arrangement and make lowercase for storing
    let name = nameRef!.current!.value.replace(/\s/g, "").toLowerCase();

    // Check if an arrangement already exists

    if (!name) {
      alert("Arrangement must have a name.");
      return;
    }

    const ingredientList = [...ingredients].filter(
      (ingredient) =>
        ingredient.plant && ingredient.quantity && ingredient.quantity > 0
    );

    // Make sure at least 1 ingredient has been added
    if (ingredientList.length === 0) {
      alert(
        "Arrangement must have at least valid 1 ingredient with quantity > 0."
      );
      return;
    }

    const hasDuplicate = () => {
      let plantNames = new Set();
      for (let ingredient of ingredientList) {
        if (plantNames.has(ingredient.plant)) {
          return true;
        }
        plantNames.add(ingredient.plant);
      }
    };

    // Check if plant has already been added
    if (hasDuplicate()) {
      alert("All plant names must be different.");
      return;
    }

    // Handle alert where name one field is blank and the other is not

    // Assemble arrangement
    const arrangement: Arrangement = {
      name,
      ingredients: ingredientList,
    };

    setArrangements([...arrangements, arrangement]);
    // set loading
    // save to db
    // end loading
    closeModal();
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
          <button
            className="btn hover:bg-red-600 glass w-1/5 bg-red-600 text-white"
            onClick={closeModal}
          >
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
