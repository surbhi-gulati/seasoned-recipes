import React from "react";
import PostCard from "./post-card";
import PostType, { PostResponseType } from "../../modules/postType";
import {useSelector} from "react-redux";
import { getAllPosts } from "../../services/post-services";

const PostList = () => {
  const [postBody, setPostBody] = React.useState([]);
  React.useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();
      setPostBody(posts);
    }
    fetchPosts();
  }, []);
  return(
    <>
      <ul className="list-group">
        {
          postBody.map((post : PostResponseType) =>
              <PostCard key={post._id} {...post}></PostCard>)
        }
      </ul>
    </>
  );
};
export default PostList;