import { createSlice } from "@reduxjs/toolkit";
import PostType, { PostResponseType } from "../modules/postType";
import { 
  createPostThunk, 
  getAllPostsThunk, 
  getFollowedPostsThunk, 
  getGroupsPostsThunk,
  deletePostThunk } from "../services/post-thunks";

const initialPostsArray : Array<PostResponseType> = [];

const initialState = {
  posts: initialPostsArray
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(createPostThunk.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    }).addCase(getAllPostsThunk.fulfilled, (state, action) => {
      console.log("all posts", action.payload);
      state.posts = action.payload;
    }).addCase(getFollowedPostsThunk.fulfilled, (state, action) => {
      console.log("followed posts", action.payload);
      state.posts = action.payload;
    }).addCase(getGroupsPostsThunk.fulfilled, (state, action) => {
      state.posts = action.payload;
    }).addCase(deletePostThunk.fulfilled, (state, action) => {
      console.log("before filter", state.posts);
      const newPosts = state.posts.filter((post) => {
        console.log("post._id", post._id);
        console.log("action.payload._id", action.payload);
        console.log("equality", post._id !== action.payload);
        return post._id !== action.payload}
      );
      console.log("after filter", newPosts);
      state.posts = newPosts;
    });
  }
});


export default postsSlice.reducer;
