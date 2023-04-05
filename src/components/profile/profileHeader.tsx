import React from "react";

const ProfileHeader = () => {    
    return (
        <>
            <p> Username </p>
            <button type="button" className="btn btn-primary"> Follow </button>
            <button type="button" className="btn btn-secondary"> Unfollow </button>
        </>
    );
};

export default ProfileHeader;
