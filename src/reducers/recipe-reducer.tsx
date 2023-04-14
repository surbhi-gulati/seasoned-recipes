import { createSlice } from "@reduxjs/toolkit";
import recipes from "../data/recipes/receipeResults"

const templateRecipe = {
  "id": 1,
  "image": "../../public/userImages/belle.jpg",
  "title": "Template Recipe",
  "readyInMinutes": 30
}

const recipesSlice = createSlice({
  name: 'recipes',
  initialState: recipes,
  reducers: {
    //for sake of testing
    addRecipe(state, action) {
      state.unshift({
        ...templateRecipe,
        ...action.payload,
        _id: (new Date()).getTime(),
      });
    },

    updateRecipeSaves(state, action) {
      console.log("tapped");
      const index = state.findIndex(save => save.id === action.payload);
      state.splice(index, 1);
    }
  }
});

export const {addRecipe, updateRecipeSaves} = recipesSlice.actions;
export default recipesSlice.reducer;