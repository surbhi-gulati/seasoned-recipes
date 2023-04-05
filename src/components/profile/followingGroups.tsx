import React from "react";
import GroupSuggestionsItem from "../groups/groupSuggestionsItem";
import groups from "../../data/groupsData";
import GroupType from "../../modules/groupType";

const FollowingGroups = () => {    
    return (
        <>
            <h2> Groups you follow </h2>
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
