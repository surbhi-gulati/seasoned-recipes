import React, {useEffect} from "react";
import PostList from "../components/posts/post-list";
import { getAllPosts } from "../services/post-services";

const FeedPage = () => {
  const [postBody, setPostBody] = React.useState([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPostBody(posts);
    }
    fetchPosts();
  }, []);
    return (
        <div>
          <PostList posts={postBody}></PostList>
        </div>
    );
};

export default FeedPage;
