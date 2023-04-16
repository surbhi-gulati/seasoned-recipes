

export default interface RecipeType {
  _id?: string,
  recipeApiId: number,
  title: string,
  description: string,
  image: string,
  tags: string[],
}

export enum FoodGroup {
  vegan = "Vegan",
  pastaLovers = "Pasta Lovers",
  subleAsianEats = "Subtle Asian Eats"
};