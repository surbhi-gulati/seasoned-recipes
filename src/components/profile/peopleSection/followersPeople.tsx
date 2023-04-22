import React from "react";
import UserType from "../../../modules/userType";
import PersonCard from "./personCard";

const FollowersPeople = ({ profile, followers }) => {  
    return (
        <>
            <h2> Who follows {profile.username}</h2>
            <div className="d-flex ">
                <i className="bi bi-lock me-2"></i>
                <p>This section is only visible to you.</p>
            </div>
            {
                followers.map((user : UserType) => {
                return (
                <PersonCard key={user._id} {...user} />                
                );
            })}
        </>
    );
};

export default FollowersPeople;
