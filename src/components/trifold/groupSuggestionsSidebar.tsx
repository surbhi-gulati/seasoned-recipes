import React from "react";
import groups from "../../data/users/groupsData";
import GroupType from "../../modules/groupType";
import GroupSuggestionsItem from "../groups/groupSuggestionsItem";

const GroupSuggestionsSidebar = () => {
  return (
    <>
      <h4> Groups you'll love... </h4>
      <div className="list-group mb-1">
        {
          groups.map((group : GroupType) => {
          return (
            <GroupSuggestionsItem key={group._id} {...group} />                
          );
        })}
        <a href="/groups">See All Groups</a>
      </div>
    </>
  );
};

export default GroupSuggestionsSidebar;
