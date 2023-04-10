export default interface RecipeType {
  vegetarian: boolean,
  vegan: boolean,
  glutenFree: boolean,
  dairyFree: boolean,
  veryHealthy: boolean,
  cheap: boolean,
  veryPopular: boolean,
  sustainable: boolean,
  cuisines: string[],
  dishTypes: string[],
  diets: string[],
  readyInMinutes: number,
  id: number,
  servings: number,
  title: string,
  image: string
}