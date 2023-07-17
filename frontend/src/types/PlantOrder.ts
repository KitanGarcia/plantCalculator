export type PlantOrder = {
  plantsPerUnit: number;
  pricePerUnit: number;
};

export type PlantOrders = {
  [name: string]: PlantOrder;
};
