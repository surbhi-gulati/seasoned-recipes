import React from "react";
import PostCard from "./post-card";
import {PostResponseType}  from "../../modules/postType";
const PostList = ({posts}) => {
  console.log("postListPosts", posts);
  return(
    <>
      <ul className="list-group">
        {
          posts.map((post : PostResponseType) =>
              post 
                ? <PostCard key={post._id} post={post}/>
                : <div>loading</div>)
        }
      </ul>
    </>
  );
};
export default PostList;