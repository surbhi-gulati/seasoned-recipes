import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getRecipeInfoByID } from "../services/recipe-api-service";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {getInternalRecipeIDByAPIID, getRecipeByID} from "../services/recipe-services";
import { createBookmark, getBookmarksByBothIds, getBookmarksByRecipeId, unbookmark } from "../services/bookmarks-services";
import { current } from "@reduxjs/toolkit";
import {getPostsByRecipeId} from "../services/post-services";

const RecipePage = () => {
  const [recipeInfo, setRecipeInfo] = React.useState<any>({});
  const [recipePosts, setRecipePosts] = React.useState<any>([]);
  const { recipe_id } = useParams();
  const [internalRecipeId, setInternalRecipeId] = React.useState<string>('');

  const getRecipeInfoHandler = async (recipe_id: number) => {
    const response = await getRecipeInfoByID(recipe_id);
    console.log("FULL getRecipeInfoByID RESPONSE:", response);
    const recipeInfo: any = {
      id: response.id,
      name: response.name,
      description: response.description,
      thumbnail_url: response.thumbnail_url,
      tags: response.tags,
      total_time_minutes: response.total_time_minutes,
      servings: response.num_servings,
      instructions: response.instructions,
      nutrition: response.nutrition,
    };
    const objIDInfo = await getRecipeByID(recipe_id);
    console.log("RETRIEVED OBJ ID IS", objIDInfo);
    setInternalRecipeId(objIDInfo._id);
    setRecipeInfo(recipeInfo);
    const posts = await getPostsByRecipeId(objIDInfo._id);
    console.log("RETRIEVED POSTS ARE", posts);
    setRecipePosts(posts);
  };

  const { currentUser } = useSelector((state: any) => state.auth);
  const [user, setUser] = React.useState<any>();
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log("GETTING RECIPE INFO FOR", recipe_id);
    if (recipe_id) {
      getRecipeInfoHandler(parseInt(recipe_id));
    }
  }, [recipe_id]);

  const [numberOfBookmarks, setNumberOfBookmarks] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const updateRecipeSavesHandler = async () => {
    // if (currentUser) {
    //   const currSaves = numberOfBookmarks;
    //   try {
    //     if (isBookmarked) {
    //       await unbookmark(recipeInfo, currentUser._id);
    //       setNumberOfBookmarks(currSaves - 1);
    //     } else {
    //       await createBookmark(recipeInfo, currentUser._id);
    //       setNumberOfBookmarks(currSaves + 1);
    //     }
    //   } catch (e) {
    //     console.log(e);
    //     return null;
    //   }
    //   setIsBookmarked(!isBookmarked);
    // }
  };

  // useEffect(() => {
  //   const bookmarkExists = async () => {
  //     if (recipeInfo) {
  //       const bookmarksForThisRecipe = await getBookmarksByRecipeId(internalRecipeId);
  //       if (bookmarksForThisRecipe) {
  //         setNumberOfBookmarks(bookmarksForThisRecipe.length);
  //       }
  //       const usersBookmarkForThisRecipe = await getBookmarksByBothIds(currentUser._id, internalRecipeId)
  //       setIsBookmarked(usersBookmarkForThisRecipe != null);
  //     }
  //   }
  //   bookmarkExists();
  // }, [currentUser, internalRecipeId, recipeInfo]);

  return (
    <div>
      <h1 className="display-4 font-italic">{recipeInfo.name}</h1>
      <div>
        <Link to={`/newPost/${recipeInfo.id}`}>
          <button type="button" className="btn btn-success">
            Make a Post
          </button>
        </Link>
      </div>
      <div className="col-1">
        {/*{isBookmarked ?*/}
        {/*    <p onClick={() => updateRecipeSavesHandler()} className="bi bi-bookmark-fill float-end"/>*/}
        {/*  : <p onClick={() => updateRecipeSavesHandler()} className="bi bi-bookmark float-end"></p>*/}
        {/*}*/}
        {/*<p>{numberOfBookmarks}</p>*/}
      </div>
      <img src={recipeInfo.thumbnail_url} className="card-img rounded" alt={recipeInfo.name} />
      <div className="jumbotron p-3 p-md-5 d-flex flex-column justify-content-center">
          {(recipeInfo.total_time_minutes !== null) && 
            <div className="mb-4 text-muted"> {recipeInfo.total_time_minutes} </div>}
          {recipeInfo.servings !== "Servings" && <h5>Servings: {recipeInfo.servings} </h5> }
          {recipeInfo.description !== null && recipeInfo.description !== '' &&
            <>
              <h5>Desription:</h5>
              <h2 className="lead mb-4">{recipeInfo.description}</h2>
            </>}
          <div className="card-text mb-4">
            <h5>Tags:</h5> 
            {getTags(recipeInfo.tags)}
          </div>
          <div className="card-text mb-4">
            {getNutrition(recipeInfo.nutrition)}
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
      <hr />
      <div>
        <h5>What people are saying about this recipe:</h5>
        <div className="list-group mb-1">
          {recipePosts.map((post : any) => {
            return getSingleReview(post.userId.username, post.userId._id, post.text);
          })}
        </div>
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

const getNutrition = (nutrition: any) => {
  if (nutrition) {
    const nutritionData = Object.entries(nutrition).filter(([key, value]) => key !== 'updated_at');
    return (
      <>
        <h5>Nutritional information:</h5> 
        <ul>
          {nutritionData.map(([key, value]) => (
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
      </>
    );
  }
};

const getSingleReview = (reviewer: string, reviewerId: string, postText: string) => {
  return (
    <Link to={`/profile/${reviewerId}`} style={{color: 'black', textDecoration: 'none' }}>
      <span className={"list-group-item"}>
        <h6> {reviewer} </h6>
        <p> {postText} </p>
      </span>
    </Link>
  );
};

export default RecipePage;
