interface ArrangementRowProps {
  index: number;
  handleInputChange: (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const ArrangementRow = ({
  index,
  handleInputChange,
}: ArrangementRowProps) => {
  return (
    <div className="flex justify-evenly mb-4">
      <div>
        <label className="label">
          <span className="label-text text-white">Name of Flower</span>
        </label>
        <label className="input-group">
          <span>Flower</span>
          <input
            type="text"
            name="name"
            placeholder="ie. Red Rose"
            className="input w-[12rem] input-bordered focus:outline-none focus:border-blue-400"
            onChange={(event) => handleInputChange(index, event)}
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
            name="quantity"
            placeholder="ie. 6"
            className="input w-[4rem] input-bordered focus:outline-none focus:border-blue-400"
            onChange={(event) => handleInputChange(index, event)}
          />
        </label>
      </div>
    </div>
  );
};
