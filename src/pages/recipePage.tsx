import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import {useSelector} from "react-redux";

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<any>({});
  const {recipe_id} = useParams();
  
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
      instructions: response.instructions[0]
    }
    setRecipeInfo(recipeInfo);
  }

  // This gets the current user from the redux store
  const {currentUser} = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  // If the recipe_id is not null, then get the recipe info on page load
  useEffect(() => {
    if(recipe_id) {
      getRecipeInfoHandler(parseInt(recipe_id));
    }
  }, [recipe_id]);

  // Pass the recipe info to the new post window
  return (
      <div>
        <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
          <div className="px-0">
            <h1 className="display-4 font-italic">{recipeInfo.name}</h1>
            <p className="lead my-3">{recipeInfo.description}</p>
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-5">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
                <b className="mb-0">{recipeInfo.yields}</b>
                <div className="mb-1 text-muted">Cook time: {recipeInfo.total_time_minutes} minutes</div>

              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start">
              </div> <p>{recipeInfo.instructions}</p>
              {/*{recipeInfo.instructions.forEach((step) => {*/}
              {/*  return <p>{step}</p>*/}
              {/*})}*/}
            </div>
          </div>
        </div>
      </div>
  );
};

export default RecipePage;