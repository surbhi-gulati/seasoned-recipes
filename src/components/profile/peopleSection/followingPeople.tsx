import React from "react";
import UserType from "../../../modules/userType";
import UserCard from "./userCard";

const FollowingPeople = ({ profile, following }) => {  
    return (
        <>
            <h2> Who {profile.username} follows </h2>
            <div className="d-flex ">
                <i className="bi bi-lock me-2"></i>
                <p>This section is only visible to you.</p>
            </div>
            {
                following.map((user : UserType) => {
                return (
                <UserCard key={user._id} {...user} />
                );
            })}
        </>
    );
};

export default FollowingPeople;
