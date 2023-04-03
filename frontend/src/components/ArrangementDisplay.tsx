import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Arrangement, Ingredient } from "../types/Arrangement";

interface ArrangementDisplayProps {
  arrangements: Arrangement[];
}

export const ArrangementDisplay = ({
  arrangements,
}: ArrangementDisplayProps) => {
  return (
    <div>
      <div className="w-[36rem] m-auto mt-8 menu rounded-box glass hover:bg-emerald-600 bg-emerald-600">
        <h1 className="mt-8 text-3xl">List of Arrangements</h1>
        <div className="mt-4 mb-8 m-auto w-3/4">
          {arrangements &&
            arrangements.map((arrangement) => (
              <ul className="list-disc text-left">
                <h2 className="mt-4 text-xl font-semibold">
                  {arrangement.name.toUpperCase()}
                </h2>
                {arrangement.ingredients.map((ingredient) => (
                  <li className="list-item">{`${ingredient.quantity} ${ingredient.name}`}</li>
                ))}
              </ul>
            ))}
        </div>
        <button className="btn glass my-8 bg-pink-500 hover:bg-pink-500 text-white w-1/3 align-center m-auto">
          Calculate!
        </button>
      </div>
    </div>
  );
};
