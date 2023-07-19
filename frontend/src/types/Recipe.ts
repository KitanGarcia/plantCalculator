export type Recipe = {
  name: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  name: string;
  quantity: number;
};
