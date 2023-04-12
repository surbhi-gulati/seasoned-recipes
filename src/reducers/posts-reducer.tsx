import { createSlice } from "@reduxjs/toolkit";
import posts from '../data/posts/postsData';

const postsSlice = createSlice({
  name: 'posts',
  initialState: posts,
  reducers: {
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

export const {deletePost, updatePostLikes} = postsSlice.actions;
export default postsSlice.reducer;