import React from "react";
import RecipeList from "../components/recipes/recipe-list";
import NewPostSrc from "../components/new-post-src";

const SearchPage = () => {    
    return (
        <div>
          <RecipeList/>
          <NewPostSrc/>
        </div>
    );
};

export default SearchPage;
