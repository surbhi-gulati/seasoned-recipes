import { createAsyncThunk } from "@reduxjs/toolkit";
import * as postService from "./post-services";
import * as upvoteService from "./upvotes-services";
import PostType from "../modules/postType";
import RecipeType from "../modules/recipeType";

type newPostType = {
  post: PostType,
  recipe: RecipeType
}

export const createPostThunk = createAsyncThunk(
  "post/create", async (postItem: newPostType) => {
    const newPost = await postService.createPostWithRecipe(postItem);
    return newPost;
  }
);

export const getAllPostsThunk = createAsyncThunk(
  "post/getAll", async () => {
    const posts = await postService.getAllPosts();
    return posts;
  }
);

export const getFollowedPostsThunk = createAsyncThunk(
  "post/getFollowed", async () => {
    const posts = await postService.getFollowedPosts();
    return posts;
  }
);

export const getGroupsPostsThunk = createAsyncThunk(
  "post/getGroups", async (groupId) => {
    const posts = await postService.getGroupsPosts(groupId);
    return posts;
  }
);

export const deletePostThunk = createAsyncThunk(
  "post/delete", async (postId: string) => {
    const deletedPost = await postService.deletePost(postId);
    console.log("deletedPost:", deletedPost);
    return postId;
  }
);