import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createBookmark,
  getBookmarksByRecipeId,
  getBookmarksByUserId,
  unbookmark,
} from '../services/bookmarks-services';

export interface Bookmark {
  id: string;
  userId: string;
  recipeId: string;
  createdAt: string;
}

interface BookmarksState {
  bookmarksByRecipeId: Record<string, Bookmark[]>;
  bookmarksByUserId: Record<string, Bookmark[]>;
}

const initialState: BookmarksState = {
  bookmarksByRecipeId: {},
  bookmarksByUserId: {},
};

export const fetchBookmarksByRecipeId = createAsyncThunk(
  'bookmarks/fetchBookmarksByRecipeId',
  async (recipeId: string) => {
    const bookmarks = await getBookmarksByRecipeId(recipeId);
    return { recipeId, bookmarks };
  }
);

export const fetchBookmarksByUserId = createAsyncThunk(
  'bookmarks/fetchBookmarksByUserId',
  async (userId: string) => {
    const bookmarks = await getBookmarksByUserId(userId);
    return { userId, bookmarks };
  }
);

export const createNewBookmark = createAsyncThunk(
  'bookmarks/createNewBookmark',
  async (bookmark: Bookmark) => {
    const newBookmark = await createBookmark(bookmark);
    return newBookmark;
  }
);

export const unbookmarkRecipe = createAsyncThunk(
  'bookmarks/unbookmarkRecipe',
  async (bookmark: Bookmark) => {
    const deletedBookmark = await unbookmark(bookmark);
    return deletedBookmark;
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmarks/removeBookmark',
  async ({ recipeId, userId }: { recipeId: number, userId: number }) => {
    unbookmarkRecipe(recipeId, userId);
    return { recipeId, userId };
  }
);

export const addBookmark = createAsyncThunk(
  'bookmarks/addBookmark',
  async ({ recipeId, userId }: { recipeId: number, userId: number }) => {
    createNewBookmark(recipeId, userId);
    return { recipeId, userId };
  }
);

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarksByRecipeId.fulfilled, (state, action) => {
        const { recipeId, bookmarks } = action.payload;
        state.bookmarksByRecipeId[recipeId] = bookmarks;
      })
      .addCase(fetchBookmarksByUserId.fulfilled, (state, action) => {
        const { userId, bookmarks } = action.payload;
        state.bookmarksByUserId[userId] = bookmarks;
      })
      .addCase(createNewBookmark.fulfilled, (state, action) => {
        const newBookmark = action.payload;
        if (!state.bookmarksByRecipeId[newBookmark.recipeId]) {
          state.bookmarksByRecipeId[newBookmark.recipeId] = [newBookmark];
        } else {
          state.bookmarksByRecipeId[newBookmark.recipeId].push(newBookmark);
        }
        if (!state.bookmarksByUserId[newBookmark.userId]) {
          state.bookmarksByUserId[newBookmark.userId] = [newBookmark];
        } else {
          state.bookmarksByUserId[newBookmark.userId].push(newBookmark);
        }
      })
      .addCase(unbookmarkRecipe.fulfilled, (state, action) => {
        const deletedBookmark = action.payload;
        if (state.bookmarksByRecipeId[deletedBookmark.recipeId]) {
          state.bookmarksByRecipeId[deletedBookmark.recipeId] = state.bookmarksByRecipeId[
            deletedBookmark.recipeId
          ].filter((bookmark) => bookmark.id !== deletedBookmark.id);
        }
        if (state.bookmarksByUserId[deletedBookmark.userId]) {
          state.bookmarksByUserId[deletedBookmark.userId] = state.bookmarksByUserId[
            deletedBookmark.userId
          ].filter((bookmark) => bookmark.id !== deletedBookmark.id);
        }
      });
  },
});

export default bookmarksSlice.reducer;
