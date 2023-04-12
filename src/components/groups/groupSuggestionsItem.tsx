import React from "react";
import GroupType from "../../modules/groupType";

const GroupSuggestionsItem = (group: GroupType) => {
    return (
        <span className={"list-group-item"}>
            <img 
                className="rounded-circle" height={48} width={48}
                src={`${group.image}`}
                alt={group.name}
                key={group.name}
            />
            <span> {group.name} </span>
        </span>
    );
};

export default GroupSuggestionsItem;
