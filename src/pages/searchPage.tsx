import React, { useEffect } from "react";
import RecipeList from "../components/recipes/recipe-list";
import { searchRecipes } from "../services/recipe-api-service";
import { useNavigate, useParams } from "react-router";

const SearchPage = () => {  

  let {searchTerm} = useParams();

  let navigate = useNavigate();

  let [search, setSearch] = React.useState<string>("");

  let [recipeList, setRecipeList] = React.useState<any>();
  
  const handleSearchButton = async (searchQuery) => {
    console.log("handleSearchButton");
    const response = await searchRecipes(searchQuery);
    if(response) {
      setRecipeList(response);
    } else {
      setRecipeList([]);
    }
    navigate(`/search/${searchQuery}`);
  }

  useEffect(() => {
    if(searchTerm) {
      setSearch(searchTerm);
      handleSearchButton(searchTerm);
    }
  }, [searchTerm]);


  return (
    <div>
      <h2>Show me meals for...</h2>
      <div className="row p-3">
        <div className="col-10">
          <input 
            type="text"
            placeholder="Search Recipes"
            className="col-10 mt-2 form-control border-0"
            onChange={(e) => { setSearch(e.currentTarget.value)}}>
          </input>
        </div>
        <button className="col-2 rounded-pill btn btn-primary "
                onClick={() => handleSearchButton(search)}>
          <i className="col-2 bi-search wd-float-left"></i>
          <div className="col-10 d-none d-xl-inline wd-subheader-text"> Search </div>
        </button>
        
      </div>
      <hr className="hr"></hr>
      { recipeList && recipeList.length > 0 &&
      <RecipeList recipesArray={recipeList}/>}
      { recipeList && recipeList.length === 0 &&
      <h4>No Recipe Results</h4>}
    </div>
  );
};

export default SearchPage;
