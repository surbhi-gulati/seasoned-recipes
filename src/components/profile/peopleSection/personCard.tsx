import React from "react";
import UserType from "../../../modules/userType";

const PersonCard = (user: UserType) => {    
    return (
        <span className={"list-group-item"}>
            <img 
                className="rounded-circle" height={48} width={48}
                src={`${user.avatar}`}
                alt={user.name}
                key={user.name}
            />
            <span> {user.name} </span>
        </span>
    );
};

export default PersonCard;
