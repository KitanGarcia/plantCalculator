export type ShoppingListItem = {
  quantity: number;
  plantsPerUnit: number;
  pricePerUnit: number;
  unitsToOrder: number;
  totalCost: number;
};

export type ShoppingList = {
  [name: string]: ShoppingListItem;
};
