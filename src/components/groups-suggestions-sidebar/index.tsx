import React from "react";
import groups from "../../data/groups/groupsData";
import GroupType from "../../modules/groupType";
import GroupSuggestionItem from "./groups-suggestion-item";

const GroupSuggestionsSidebar = () => {
  return (
    <div className="list-group mb-1">
      <ul className="list-group">
        {
          groups.map((group : GroupType) => {
          return (
            <GroupSuggestionItem {...group} />                
          );
        })}
      </ul>
      <a href="../../pages/groupsPage">See All Groups</a>
    </div>
  );
};

export default GroupSuggestionsSidebar;
