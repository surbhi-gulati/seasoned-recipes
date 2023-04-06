import React from "react";
import GroupSuggestionsItem from "../../groups/groupSuggestionsItem";
import groups from "../../../data/groupsData";
import GroupType from "../../../modules/groupType";
import UserType from "../../../modules/userType";

const FollowingGroups = ({user}) => {    
    return (
        <>
            <h2> Groups {user.name} follows </h2>
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