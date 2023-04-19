import { createSlice } from "@reduxjs/toolkit";
import posts from "../data/posts/postsData";

const templatePost = {
  "_id": 1,
  "recipe_id": 715467,
  "user_id": 1,
  "caption": "template caption",
  "date": "Jan 1, 2023",
  "likes": 0,
  "liked": true
}

const postsSlice = createSlice({
  name: 'posts',
  initialState: posts,
  reducers: {
    createPost(state, action) {
      state.unshift({
          ...templatePost,
          ...action.payload,
          _id: (new Date()).getTime(),
      })
    },
    deletePost(state, action) {
      const index = state
      .findIndex(post =>
          post._id === action.payload);
      state.splice(index, 1);
    },
    updatePostLikes(state, action) {
      const post = state.find(post => post._id === action.payload);
      // @ts-ignore
      post.liked ? post.likes-- : post.likes++;
      // @ts-ignore
      post.liked = !post.liked;
    }
  }
});

export const {createPost, deletePost, updatePostLikes} = postsSlice.actions;
export default postsSlice.reducer;
