import React from "react";
import GroupType from "../../modules/groupType";

const GroupSuggestionItem = (group: GroupType) => {
    return (
        <span>
            <img className="rounded-circle" height={48} 
                src={`/data/groups/images/${group.image}`}
                alt={group.name}
            />
            <p> {group.name} </p>
        </span>
    );
};

export default GroupSuggestionItem;
