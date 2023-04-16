export default interface PostType {
  _id: number,
  recipe_id: number,
  user_id: number,
  caption: string,
  date: string,
  likes: number,
  liked: boolean
  groupName: FoodGroup
}

export enum FoodGroup {
  vegan = "Vegan",
  pastaLovers = "Pasta Lovers",
  subleAsianEats = "Subtle Asian Eats"
};