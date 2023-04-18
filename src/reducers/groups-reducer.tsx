import { createSlice } from "@reduxjs/toolkit";
import { getAllGroups, createGroup as createGroupService, updateGroup } from "../services/group-services";
import groups from "../data/users/groupsData";

const groupsSlice = createSlice({
  name: 'groups',
  initialState: groups,
  reducers: {
    setGroups(state, action) {
      return action.payload;
    },
    addGroup(state, action) {
      state.unshift(action.payload);
    },
    removeGroup(state, action) {
      const index = state.findIndex(group => group._id === action.payload);
      state.splice(index, 1);
    },
    updateGroupInfo(state, action) {
      const { groupId, newInfo } = action.payload;
      const index = state.findIndex(group => group._id === groupId);
      if (index !== -1) {
        state[index] = { ...state[index], ...newInfo };
      }
    },
  },
});

export const { setGroups, addGroup, removeGroup, updateGroupInfo } = groupsSlice.actions;

export const fetchGroups = () => async dispatch => {
  const groups = await getAllGroups();
  if (groups) {
    dispatch(setGroups(groups));
  }
};

export const createGroup = group => async dispatch => {
  const createdGroup = await createGroupService({ group });
  if (createdGroup) {
    dispatch(addGroup(createdGroup));
  }
};

export const updateGroupDetails = ({ groupId, group }) => async dispatch => {
  const updatedGroup = await updateGroup({ groupId, group });
  if (updatedGroup) {
    dispatch(updateGroupInfo({ groupId, newInfo: updatedGroup }));
  }
};

export default groupsSlice.reducer;
