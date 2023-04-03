import React from "react";
import {Link} from "react-router-dom";
import GroupSuggestionItem from "./groups-suggestion-item";

const GroupSuggestionsSidebar = () => {
  return (
    <div className="list-group mb-1">
      {/* <ul className="list-group">
        {tuits.map &&
        tuits.map((tuit) => <GroupSuggestionItem key={tuit._id} tuit={tuit} />)}
      </ul> */}
      <p> hey here are some groups</p>
      <a href="../../pages/groupsPage">See All Groups</a>
    </div>
  );
};

export default GroupSuggestionsSidebar;
