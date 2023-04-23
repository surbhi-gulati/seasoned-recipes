import { createSlice } from "@reduxjs/toolkit";
import posts from "../data/posts/postsData";
import PostType from "../modules/postType";

const templatePost = {
  "_id": 1,
  "recipe_id": 715467,
  "user_id": 1,
  "caption": "template caption",
  "date": "Jan 1, 2023",
  "likes": 0,
  "liked": true
}

const initialAllPosts : Array<PostType> = [];
const initialFollowedPosts : Array<PostType> = [];

const initialPosts = {
  allPosts: initialAllPosts,
  followedPosts: initialFollowedPosts,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPosts,
  reducers: {
    createPost(state, action) {
      state.allPosts.unshift({
          ...templatePost,
          ...action.payload,
          _id: (new Date()).getTime(),
      })
    },
    deletePost(state, action) {
      const index = state.allPosts
      .findIndex(post =>
          post._id === action.payload);
      state.allPosts.splice(index, 1);
    },
    updatePostLikes(state, action) {
      const post = state.allPosts.find(post => post._id === action.payload);
      // @ts-ignore
      post.liked ? post.likes-- : post.likes++;
      // @ts-ignore
      post.liked = !post.liked;
    }
  }
});

export const {createPost, deletePost, updatePostLikes} = postsSlice.actions;
export default postsSlice.reducer;
