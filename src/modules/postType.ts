import { Types } from "mongoose";
import UserType from "./userType";
import GroupType from "./groupType";
import RecipeType from "./recipeType";

export default interface PostType {
  _id?: string,
  text: string,
  date: string,
  likes: number,
  liked: boolean,
  userId: string,
  groupId?: string,
  groupName: string,
  recipeId?: string,
  
}

export interface PostResponseType {
  _id?: string,
  text: string,
  date: string,
  likes: number,
  liked: boolean,
  userId: UserType,
  groupId: GroupType,
  groupName: string,
  recipeId: RecipeType
}

export enum FoodGroup {
  vegan = "Vegan",
  pastaLovers = "Pasta Lovers",
  subleAsianEats = "Subtle Asian Eats"
};