import React from "react";
import PostList from "../components/posts/post-list";

const BookmarksPage = () => {    
    return (
        <div>
            <h3> Bookmarked Recipes </h3>
            <PostList/>
        </div>
    );
};

export default BookmarksPage;

/*
PostList strategy:
- accept a generic post array instead of the React useEffect from local posts
- move the current useEffect in to the feed page logic to pass in to PostList param
- in this page pull and filter all the posts of this user then filter on what is bookmarked.
then pass that list in as the parameter
*/