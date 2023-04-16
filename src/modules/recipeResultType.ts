import RecipeDetailsType from "./recipeDetailsType";

export default interface RecipeResults {
  results: RecipeDetailsType[]
  offset: number
  number: number
  totalResults: number
}