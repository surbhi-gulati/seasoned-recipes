import React from "react";
import { useSelector } from "react-redux";
import { getBookmarksByUserId } from "../services/bookmarks-services";
import RecipeList from "../components/recipes/recipe-list";
import LoginPrompt from "../components/loginPrompt";

const BookmarksPage = () => {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const [postBody, setPostBody] = React.useState([]);
  
  React.useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser) {
        const posts = await getBookmarksByUserId(currentUser._id, false);
        setPostBody(posts);
      }
    };
    fetchPosts();
  }, [currentUser]);
  
  return (
    <div>
      {currentUser 
          ? <>
              <h2> My Bookmarks</h2>
              <RecipeList recipesArray={postBody}/>
            </>
          : <LoginPrompt promptText={"Please Login to see your bookmarks"}/>}
    </div>
  );
};

export default BookmarksPage;
