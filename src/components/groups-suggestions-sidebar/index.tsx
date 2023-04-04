import React from "react";
import groups from "../../data/groups/groupsData";
import GroupType from "../../modules/groupType";
import GroupSuggestionItem from "./groups-suggestion-item";

const GroupSuggestionsSidebar = () => {
  return (
    <div className="list-group mb-1">
      {
        groups.map((group : GroupType) => {
        return (
          <GroupSuggestionItem {...group} />                
        );
      })}
      <a href="/groups">See All Groups</a>
    </div>
  );
};

export default GroupSuggestionsSidebar;
