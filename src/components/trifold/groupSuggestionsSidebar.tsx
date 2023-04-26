import React from "react";
import GroupType from "../../modules/groupType";
import GroupSuggestionsItem from "../groups/groupSuggestionsItem";
import {getAllGroups} from "../../services/group-services";

const GroupSuggestionsSidebar = () => {
  const [groups, setGroups] = React.useState([]);
  React.useEffect(() => {
    const fetchGroups = async () => {
      const allGroups = await getAllGroups();
      setGroups(allGroups);
    }
    fetchGroups();
  }, []);
  return (
    <div className="list-group mb-1">
      {
        groups.map((group : GroupType) => {
        return (
          <GroupSuggestionsItem key={group._id} {...group} />                
        );
      })}
      <a href="/groups">See All Groups</a>
    </div>
  );
};

export default GroupSuggestionsSidebar;
