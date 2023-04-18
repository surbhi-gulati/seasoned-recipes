import React, { useEffect } from "react";
import RecipeList from "../components/recipes/recipe-list";
import { searchRecipes } from "../services/recipe-api-service";
import { useNavigate, useParams } from "react-router";

const SearchPage = () => {  

  let {searchTerm} = useParams();

  let navigate = useNavigate();

  let [search, setSearch] = React.useState<string>("");

  let [recipeList, setRecipeList] = React.useState<any>([])

  const handleSearchButton = async (searchQuery) => {
    console.log("handleSearchButton");
    const response = await searchRecipes(searchQuery);
    if(response) {
      setRecipeList(response.results);
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
    <>
      <h3> Browse Recipes </h3>
      <p> 
        Discover new recipes by searching for what you care about!
        If you find something you fancy, you can bookmark it or even make a post to 
        a group that might also take interest! 
      </p>
      <div className="row card p-3">
        <div className="col-10">
          <input 
            type="text"
            placeholder="Search Recipes"
            className="col-10 mt-2 form-control border-0"
            onChange={(e) => { setSearch(e.currentTarget.value)}}>
          </input>
        </div>
        <button className="col-2 rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold"
                onClick={() => handleSearchButton(search)}>
            <i className="bi bi-search"></i>
        </button>
      </div>
      <RecipeList recipesArray={recipeList}/>
    </>
  );
};

export default SearchPage;
