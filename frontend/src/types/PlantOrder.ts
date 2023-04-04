export type PlantOrder = {
  plantsPerUnit: number;
  numberOfUnits: number;
  pricePerUnit: number;
};

export type PlantOrders = {
  [name: string]: PlantOrder;
};
