import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    createUpvote,
    getUpvotesByPostId,
    getUpvotesByUserId,
    removeUpvote,
} from '../services/upvotes-services';

export interface Upvote {
    id: string;
    userId: string;
    postId: string;
    createdAt: string;
}

interface UpvotesState {
    upvotesByPostId: Record<string, Upvote[]>;
    upvotesByUserId: Record<string, Upvote[]>;
}

const initialState: UpvotesState = {
  upvotesByPostId: {},
  upvotesByUserId: {},
};

export const fetchUpvotesByPostId = createAsyncThunk(
  'upvotes/getUpvotesByPostId',
  async (postId: string) => {
    const upvotes = await getUpvotesByPostId(postId);
    return { postId, upvotes };
  }
);

export const fetchUpvotesByUserId = createAsyncThunk(
  'upvotes/getUpvotesByUserId',
  async (userId: string) => {
    const upvotes = await getUpvotesByUserId(userId);
    return { userId, upvotes };
  }
);

export const createNewUpvote = createAsyncThunk(
  'upvotes/createUpvote',
  async (upvote: Upvote) => {
    const newUpvote = await createUpvote({ upvote });
    return newUpvote;
  }
);

export const removeAnUpvote = createAsyncThunk(
  'upvotes/removeUpvote',
  async (upvote: Upvote) => {
    const deletedUpvote = await removeUpvote({ upvote });
    return deletedUpvote;
  }
);

export const upvotesSlice = createSlice({
  name: 'upvotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpvotesByPostId.fulfilled, (state, action) => {
        const { postId, upvotes } = action.payload;
        state.upvotesByPostId[postId] = upvotes;
      })
      .addCase(fetchUpvotesByUserId.fulfilled, (state, action) => {
        const { userId, upvotes } = action.payload;
        state.upvotesByUserId[userId] = upvotes;
      })
      .addCase(createNewUpvote.fulfilled, (state, action) => {
        const newUpvote = action.payload;
        if (state.upvotesByPostId[newUpvote.postId]) {
          state.upvotesByPostId[newUpvote.postId].push(newUpvote);
        }
        if (state.upvotesByUserId[newUpvote.userId]) {
          state.upvotesByUserId[newUpvote.userId].push(newUpvote);
        }
      })
      .addCase(removeAnUpvote.fulfilled, (state, action) => {
        const deletedUpvote = action.payload;
        if (state.upvotesByPostId[deletedUpvote.postId]) {
          state.upvotesByPostId[deletedUpvote.postId] = state.upvotesByPostId[
            deletedUpvote.postId
          ].filter((upvote) => upvote.id !== deletedUpvote.id);
        }
        if (state.upvotesByUserId[deletedUpvote.userId]) {
          state.upvotesByUserId[deletedUpvote.userId] = state.upvotesByUserId[
            deletedUpvote.userId
          ].filter((upvote) => upvote.id !== deletedUpvote.id);
        }
      });
  },
});

export default upvotesSlice.reducer;
