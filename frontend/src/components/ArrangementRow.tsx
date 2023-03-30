import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { PlantOrder } from "../types/PlantOrder";

export const ArrangementRow = () => {
  return (
    <div className="flex justify-evenly mb-4">
      <div>
        <label className="label">
          <span className="label-text text-white">Name of Plant</span>
        </label>
        <label className="input-group">
          <span>Plant</span>
          <input
            type="text"
            placeholder="ie. Red Rose"
            className="input w-[12rem] input-bordered focus:outline-none focus:border-blue-400"
          />
        </label>
      </div>
      <div>
        <label className="label">
          <span className="label-text text-white">Number of Stems</span>
        </label>
        <label className="input-group">
          <span>Number</span>
          <input
            type="text"
            placeholder="ie. 6"
            className="input w-[4rem] input-bordered focus:outline-none focus:border-blue-400"
          />
        </label>
      </div>
    </div>
  );
};
