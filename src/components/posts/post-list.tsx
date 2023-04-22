import React from "react";
import PostCard from "./post-card";
import { PostResponseType}  from "../../modules/postType";
const PostList = ({posts}) => {
  return(
    <>
      <ul className="list-group">
        {
          posts.map((post : PostResponseType) =>
              <PostCard key={post._id} {...post}></PostCard>)
        }
      </ul>
    </>
  );
};
export default PostList;