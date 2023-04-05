import React from "react";
import RecipeList from "../components/recipes/recipe-list";
import { searchRecipes } from "../services/recipe-api-service";

const SearchPage = () => {  
  let [search, setSearch] = React.useState<string>("");

  let [recipeList, setRecipeList] = React.useState<any>([])

  const handleSearchButton = async () => {
    console.log("handleSearchButton");
    const response = await searchRecipes(search);
    console.log(response.results);
    setRecipeList(response.results);
  }
  return (
    <div>
      <div className="row p-3">
        <div className="col-10">
          <input 
            type="text"
            placeholder="Search Recipes"
            className="col-10 mt-2 form-control border-0"
            onChange={(e) => { setSearch(e.currentTarget.value)}}>
          </input>
        </div>
        
        <button className="col-2 rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                onClick={() => handleSearchButton()}>
            Search Recipe
        </button>
        
      </div>
      <hr className="hr"></hr>
      <RecipeList recipesArray={recipeList}/>
    </div>
  );
};

export default SearchPage;
