import React from "react";
import { useSelector } from "react-redux";
import PostList from "../components/posts/post-list";
import { getBookmarksByUserId } from "../services/bookmarks-services";

const BookmarksPage = () => {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const [postBody, setPostBody] = React.useState([]);
  
  React.useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser) {
        const posts = await getBookmarksByUserId(currentUser._id);
        setPostBody(posts);
      }
    };
    fetchPosts();
  }, [currentUser]);
  
  return (
    <div>
      <PostList posts={postBody} />
    </div>
  );
};

export default BookmarksPage;
