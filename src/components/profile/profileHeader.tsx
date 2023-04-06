import React from "react";

const ProfileHeader = ({user}) => {
    return (
        <div className="bg-light">
            <h1 className="display-4 text-success"> {user.username} </h1>
            <button type="button" className="btn btn-sm btn-primary"> Follow </button>
            <button type="button" className="btn btn-sm btn-secondary"> Unfollow </button>
        </div>
    );
};

export default ProfileHeader;
