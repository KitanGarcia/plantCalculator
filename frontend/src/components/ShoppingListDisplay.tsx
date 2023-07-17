import { ShoppingList } from "../types/ShoppingListItem";

interface ShoppingListDisplayProps {
  list: ShoppingList;
}

export const ShoppingListDisplay = ({ list }: ShoppingListDisplayProps) => {
  let total = 0;
  Object.keys(list).forEach((item) => (total += list[item].totalCost));
  total = Math.round((total + Number.EPSILON) * 100) / 100;

  return (
    <div>
      <div className="w-[36rem] m-auto mt-8 menu rounded-box glass hover:bg-emerald-600 bg-emerald-600">
        <h1 className="mt-8 text-3xl">Shopping List</h1>
        <div className="mt-4 mb-8 m-auto w-3/4">
          {list && (
            <ul>
              {Object.keys(list).map((item, index) => (
                <li key={index}>
                  <p>{`${list[item].quantity} ${item} --- ${
                    list[item].unitsToOrder
                  } order(s) --- $${list[item].totalCost.toFixed(2)}`}</p>
                </li>
              ))}
            </ul>
          )}
          <h1>{`Total: $${total.toFixed(2)}`}</h1>
        </div>
      </div>
    </div>
  );
};
