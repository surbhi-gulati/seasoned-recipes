import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import { useSelector } from "react-redux";

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<any>({});
  const { recipe_id } = useParams();

  // This gets the recipe info from the API
  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    console.log("FULL RESPONSE:", response);
    const recipeInfo: any = {
      id: response.id,
      name: response.name,
      description: response.description,
      thumbnail_url: response.thumbnail_url,
      tags: response.tags,
      total_time_minutes: response.total_time_minutes,
      yields: response.yields,
      instructions: response.instructions,
    };
    setRecipeInfo(recipeInfo);
  };

  // This gets the current user from the redux store
  const { currentUser } = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if (recipe_id) {
      getRecipeInfoHandler(parseInt(recipe_id));
    }
  }, [recipe_id]);

  return (
    <div>
      <img src={recipeInfo.thumbnail_url} className="card-img" alt="..."/>
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark d-flex flex-column justify-content-center">
          <h1 className="display-4 font-italic">{recipeInfo.name}</h1>
          {(recipeInfo.total_time_minutes != null) && <div className="mb-1 text-muted"> {recipeInfo.total_time_minutes} </div>}
          <div className="mb-1 text-muted">{recipeInfo.yields}</div>
          <p className="lead my-3">{recipeInfo.description}</p>
          <div className="card-text mb-1"><small className="text-muted">Tags: </small>{getTags(recipeInfo.tags)}</div>
          {recipeInfo.instructions &&
            <div>
            <h5>Instructions:</h5>
            <ul style={{listStyleType: 'none'}}>
            {recipeInfo.instructions.map((instruction: any, index: number) => (
              <li key={index}>{`${index + 1}. ${instruction.display_text}`}</li>
            )) }
            </ul>
            </div>
          }
      </div>
    </div>
  );
};

const getTags = (tags: Array<any>) => {
  const limit = 3;
  if(tags) {
    const limitedTags = tags.slice(0, limit);
    return limitedTags.map(tag => 
      <span key={tag.id} className="badge mx-1 rounded-pill bg-info">{`${tag.display_name}`} </span>
    );
  }
}

export default RecipePage;
