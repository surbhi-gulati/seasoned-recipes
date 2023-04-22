import React from "react";
import PostCard from "./post-card";
import PostType from "../../modules/postType";
const PostList = ({posts}) => {
  return(
    <>
      <ul className="list-group">
        {
          posts.map((post : PostType) =>
              <PostCard key={post._id} {...post}></PostCard>)
        }
      </ul>
    </>
  );
};
export default PostList;