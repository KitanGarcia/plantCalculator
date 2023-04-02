export type Arrangement = {
  name: string;
  plants: Ingredient[];
};

export type Ingredient = {
  plant: string;
  quantity: number;
};
