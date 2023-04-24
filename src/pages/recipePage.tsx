import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import { useSelector } from "react-redux";

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<any>({});
  const { recipe_id } = useParams();

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
      servings: response.num_servings,
      instructions: response.instructions,
    };
    setRecipeInfo(recipeInfo);
  };

  const { currentUser } = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    if (recipe_id) {
      getRecipeInfoHandler(parseInt(recipe_id));
    }
  }, [recipe_id]);

  return (
    <div>
      <h1 className="display-4 font-italic">{recipeInfo.name}</h1>
      <img src={recipeInfo.thumbnail_url} className="card-img" alt="..."/>
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark d-flex flex-column justify-content-center">
          {(recipeInfo.total_time_minutes !== null) && 
            <div className="mb-4 text-muted"> {recipeInfo.total_time_minutes} </div>}
          {recipeInfo.servings !== "Servings" && <h5>Servings: {recipeInfo.servings} </h5> }
          {recipeInfo.description !== null && recipeInfo.description !== '' &&
            <>
              <h5>Desription:</h5>
              <h2 className="lead mb-4">surbhi {recipeInfo.description}</h2>
            </>}
          <div className="card-text mb-4">
            <h5>Tags:</h5> 
            {getTags(recipeInfo.tags)}
          </div>
          {recipeInfo.instructions && (
            <div>
            <h5>Instructions:</h5>
            <table>
              <tbody>
                {recipeInfo.instructions.map(
                  (instruction: any, index: number) => (
                    <tr key={index} style={{ marginBottom: '40px' }}>
                      <td style={{ color: '#17a2b8', paddingRight: '20px' }}>{`${index + 1}`}</td>
                      <td>{instruction.display_text}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const getTags = (tags: Array<any>) => {
  if (tags) {
    return tags.map((tag) => (
      <span key={tag.id} className="badge mx-1 rounded-pill bg-info">{`${tag.display_name}`}</span>
    ));
  }
};


export default RecipePage;
