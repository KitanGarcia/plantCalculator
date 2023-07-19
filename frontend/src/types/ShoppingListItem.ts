export type ShoppingListItem = {
  quantity: number;
  flowersPerBunch: number;
  pricePerBunch: number;
  bunchesToOrder: number;
  totalCost: number;
};

export type ShoppingList = {
  [name: string]: ShoppingListItem;
};
