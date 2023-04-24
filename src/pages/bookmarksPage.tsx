import React from "react";
import { useSelector } from "react-redux";
import { getBookmarksByUserId } from "../services/bookmarks-services";
import RecipeList from "../components/recipes/recipe-list";

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
      <h2> My Bookmarks</h2>
      {currentUser ? <RecipeList recipesArray={postBody}/>
          : <p>See your bookmarks here when you log in!</p>}
    </div>
  );
};

export default BookmarksPage;
