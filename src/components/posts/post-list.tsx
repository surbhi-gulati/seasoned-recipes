import React from "react";
import posts from "../../data/posts/postsData";
import PostCard from "./post-card";
import PostType from "../../modules/postType";

const PostList = () => {
  return(
      <ul className="list-group">
        {
          posts.map((post : PostType) =>
              <PostCard key={post._id} {...post}></PostCard>)
        }
      </ul>
  );
};
export default PostList;