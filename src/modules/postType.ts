import { Types } from "mongoose";

export default interface PostType {
  _id?: number,
  text: string,
  date: string,
  likes: number,
  liked: boolean,
  userId: string,
  groupId?: string,
  groupName: string,
  recipeId?: string,
  
}

export enum FoodGroup {
  vegan = "Vegan",
  pastaLovers = "Pasta Lovers",
  subleAsianEats = "Subtle Asian Eats"
};