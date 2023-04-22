import React, { useEffect } from "react";
import {createFollow, unfollow} from "../../services/follows-services";
import { useNavigate } from "react-router-dom";

const ProfileHeader = ({authenticated, isFollowing, user}) => {
    const isSelf = authenticated && user && authenticated._id === user._id;
    const navigate = useNavigate();

    const handleFollow = async () => {
        try {
            await createFollow(authenticated._id, user._id);
            navigate(`/profile/${user._id}`);
        } catch (e) {
            alert(e);
        }
    };

    const handleUnfollow = async () => {

      try {
        const deletedFollow = await unfollow(authenticated._id, user._id);
        console.log(deletedFollow);
        navigate(`/profile/${user._id}`);
      } catch (e) {
        alert(e);
      }
    }

    return (
        <div className="bg-light mb-4">
            <h1 className="display-4 text-success"> {user && user.username} </h1>
            {!isSelf && authenticated && !isFollowing && 
            <button type="button" 
                    className="btn btn-sm btn-primary"
                    onClick={() => handleFollow()}> 
                    Follow </button>}

            {!isSelf && authenticated && isFollowing &&
            <button type="button" 
            className="btn btn-sm btn-secondary"
            onClick={() => handleUnfollow()}> Unfollow </button>}
        </div>
    );
};

export default ProfileHeader;
