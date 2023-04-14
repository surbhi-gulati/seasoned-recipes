import RecipeType from "./recipeType";

export default interface RecipeResults {
  results: RecipeType[]
  offset: number
  number: number
  totalResults: number
}