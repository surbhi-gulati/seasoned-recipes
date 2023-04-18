import { createSlice } from "@reduxjs/toolkit";
import groups from "../data/users/groupsData";

const templateGroup = {
  "_id": 2,
  "name": "Pasta Lovers",
  "image": "/groupImages/pastaLovers.jpg",
  "description": "This a group created by pasta lovers for pasta lovers! Here you will find delicious and yummy pictures, recipes and more!"
}

const groupsSlice = createSlice({
  name: 'groups',
  initialState: groups,
  reducers: {
    createGroup(state, action) {
      state.unshift({
          ...templateGroup,
          ...action.payload,
          _id: (new Date()).getTime(),
      })
    },
    deleteGroup(state, action) {
      const groupAtIndex = state
      .findIndex(group =>
          group._id === action.payload);
      state.splice(groupAtIndex, 1);
    },
    updateGroupDescription(state, action) {
      const groupId = action.payload.groupId;
      const newDescription = action.payload.newDescription;
    
      const groupIndex = state.findIndex(group => group._id === groupId);
      if (groupIndex !== -1) {
        state[groupIndex].description = newDescription;
      }
    },    
    updateGroupImage(state, action) {
      const groupId = action.payload.groupId;
      const newImage = action.payload.newImage;
    
      const groupIndex = state.findIndex(group => group._id === groupId);
      if (groupIndex !== -1) {
        state[groupIndex].image = newImage;
      }
    }    
  }
});

export const {createGroup, deleteGroup, updateGroupDescription, updateGroupImage} = groupsSlice.actions;
export default groupsSlice.reducer;
