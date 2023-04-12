import React from "react";
import PostCard from "./post-card";
import PostType from "../../modules/postType";
import {useSelector} from "react-redux";

const PostList = () => {
  // @ts-ignore
  const postsArray = useSelector(state => state.posts)
  return(
      <ul className="list-group">
        {
          postsArray.map((post : PostType) =>
              <PostCard key={post._id} {...post}></PostCard>)
        }
      </ul>
  );
};
export default PostList;