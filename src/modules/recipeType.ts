

export default interface RecipeType {
  _id?: string,
  id: number,
  name: string,
  thumbnail_url: string,
  tags: string[],
  yields: string,
  total_time_minutes: string
}

export enum FoodGroup {
  vegan = "Vegan",
  pastaLovers = "Pasta Lovers",
  subleAsianEats = "Subtle Asian Eats"
};