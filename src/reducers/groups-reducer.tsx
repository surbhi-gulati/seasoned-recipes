import { createSlice } from "@reduxjs/toolkit";
import { getAllGroups, createGroup as createGroupService, updateGroup } from "../services/group-services";

interface GroupsState {
  _id: string,
  name: string,
  image: string,
  description: string
}

const initialState: GroupsState[] = [];

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups(state, action) {
      return action.payload as GroupsState[];
    },
    addGroup(state, action) {
      state.unshift(action.payload[0]);
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
  const createdGroup = await createGroupService(group);
  if (createdGroup) {
    dispatch(addGroup(createdGroup));
  }
};

export const updateGroupDetails = ({ groupId, group }) => async dispatch => {
  const updatedGroup = await updateGroup({ groupId, ...group });
  if (updatedGroup) {
    dispatch(updateGroupInfo({ groupId, newInfo: updatedGroup }));
  }
};

export default groupsSlice.reducer;
