import React from "react";
import PostCard from "./post-card";
import PostType from "../../modules/postType";

interface PostListProps {
  postBody: PostType[];
}

const PostList = ({ postBody }: PostListProps) => {
  return (
    <>
      <ul className="list-group">
        {
          postBody.map((post : PostType) =>
            <PostCard key={post._id} {...post}></PostCard>)
        }
      </ul>
    </>
  );
};

export default PostList;