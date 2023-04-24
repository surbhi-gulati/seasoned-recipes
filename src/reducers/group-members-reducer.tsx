// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import {
//     createGroupMember,
//     getGroupMembersByGroupId,
//     getGroupsByUserId,
//     leaveGroup,
// } from '../services/group-members-services';
//
// export interface GroupMember {
//     id: string;
//     userId: string;
//     groupId: string;
//     createdAt: string;
// }
//
// interface GroupMembersState {
//     groupByGroupId: Record<string, GroupMember[]>;
//     groupByUserId: Record<string, GroupMember[]>;
// }
//
// const initialState: GroupMembersState = {
//     groupByGroupId: {},
//     groupByUserId: {},
// };
//
// export const fetchGroupMembersByGroupId = createAsyncThunk(
// 'groupMembers/fetchGroupMembersByGroupId',
// async (groupId: string) => {
//     const groupMembers = await getGroupMembersByGroupId(groupId);
//     return { groupId, groupMembers };
// });
//
// export const fetchGroupsByUserId = createAsyncThunk(
// 'groupMembers/fetchGroupsByUserId',
// async (userId: string) => {
//     const groupMembers = await getGroupsByUserId(userId);
//     return { userId, groupMembers };
// });
//
// export const createNewGroupMember = createAsyncThunk(
// 'groupMembers/createNewGroupMember',
// async (groupMember: GroupMember) => {
//     const newGroupMember = await createGroupMember(groupMember.groupId, groupMember.userId);
//     return newGroupMember;
// });
//
// export const leaveGroupMember = createAsyncThunk(
// 'groupMembers/leaveGroupMember',
// async (groupMember: GroupMember) => {
//     const deletedGroupMember = await leaveGroup(groupMember);
//     return deletedGroupMember;
// });
//
// export const groupMembersSlice = createSlice({
//     name: 'groupMembers',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchGroupMembersByGroupId.fulfilled, (state, action) => {
//             const { groupId, groupMembers } = action.payload;
//             state.groupByGroupId[groupId] = groupMembers;
//         })
//         .addCase(fetchGroupsByUserId.fulfilled, (state, action) => {
//             const { userId, groupMembers } = action.payload;
//             state.groupByUserId[userId] = groupMembers;
//         })
//         .addCase(createNewGroupMember.fulfilled, (state, action) => {
//             const newGroupMember = action.payload;
//             if (state.groupByGroupId[newGroupMember.groupId]) {
//             state.groupByGroupId[newGroupMember.groupId].push(newGroupMember);
//             }
//             if (state.groupByUserId[newGroupMember.userId]) {
//             state.groupByUserId[newGroupMember.userId].push(newGroupMember);
//             }
//         })
//         .addCase(leaveGroupMember.fulfilled, (state, action) => {
//             const deletedGroupMember = action.payload;
//             if (state.groupByGroupId[deletedGroupMember.groupId]) {
//             state.groupByGroupId[deletedGroupMember.groupId] = state.groupByGroupId[
//                 deletedGroupMember.groupId
//             ].filter((groupMember) => groupMember.id !== deletedGroupMember.id);
//             }
//             if (state.groupByUserId[deletedGroupMember.userId]) {
//             state.groupByUserId[deletedGroupMember.userId] = state.groupByUserId[
//                 deletedGroupMember.userId
//             ].filter((groupMember) => groupMember.id !== deletedGroupMember.id);
//             }
//         });
//     },
// });
//
// export default groupMembersSlice.reducer;
