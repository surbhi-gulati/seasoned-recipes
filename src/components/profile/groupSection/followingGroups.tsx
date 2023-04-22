import React from "react";
import GroupSuggestionsItem from "../../groups/groupSuggestionsItem";
import GroupType from "../../../modules/groupType";
import {getGroupsByUserId} from "../../../services/group-members-services";

const FollowingGroups = ({profile, groups}) => {

    return (
      <>
          <h2> Groups {profile.username} follows </h2>
          <div className="list-group mb-1">
              {
                groups.map((group : GroupType) => {
                  return (
                      <GroupSuggestionsItem key={group._id} {...group} />                
                  );
              })}
          </div>
      </>
    );
};

export default FollowingGroups;
