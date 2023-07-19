export type FlowerOrder = {
  flowersPerBunch: number;
  pricePerBunch: number;
};

export type FlowerOrders = {
  [name: string]: FlowerOrder;
};
