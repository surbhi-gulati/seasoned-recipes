import {Recipe} from "@reduxjs/toolkit/dist/query/core/buildThunks";
import RecipeType from "./recipeType";

export default interface PostType {
  _id: number,
  recipe_id: number,
  user_id: number,
  caption: string,
  date: string,
  likes: number,
  liked: boolean
  groupName: FoodGroup // change to group_id
}

export enum FoodGroup {
  vegan = "Vegan",
  pastaLovers = "Pasta Lovers",
  subleAsianEats = "Subtle Asian Eats"
};