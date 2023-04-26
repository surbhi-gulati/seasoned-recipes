import React, {useEffect, useState} from "react";
import GroupType from "../../modules/groupType";
import {useSelector} from "react-redux";
import {
  createGroupMember,
  getGroupsByUserId,
  leaveGroup
} from "../../services/group-members-services";
import {Link} from "react-router-dom";
import UserList from "../profile/peopleSection/userList";

const GroupCard = (props: GroupType) => {
  const [hasJoined, setHasJoined] = useState(false);
  const {currentUser} = useSelector((state: any) => state.auth);
  const clickJoinHandler = async () => {
    try {
      if (hasJoined) {
        await leaveGroup(props._id, currentUser._id);
      }  else {
        await createGroupMember(props._id, currentUser._id);
      }
      setHasJoined(!hasJoined);
    } catch (e) {
      alert(e);
    }
  };

  useEffect( () => {
    const currUsersGroups = async () => {
      const groups = await getGroupsByUserId(currentUser._id);
      groups.forEach((group) => {
        if (group.name === props.name) {
          setHasJoined(true);
          return;
        }
      })
    }
    currUsersGroups()
  }, [])
    return (
          <div className="card my-3">
            <Link to={`/group/${props._id}`} style={{color: 'black', textDecoration: 'none' }}>
              <div className="my-2">

                <img
                  className="card-img mt-2"
                  src={`${props.image}`}
                  alt={props.name} />
              </div>
            </Link>
            <div className="row">
                <div className="card-body col-9">
                  <Link to={`/group/${props._id}`} style={{color: 'black', textDecoration: 'none' }}>
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.description}</p>
                  </Link>
                </div>
              <div className="card-body col-3">
                { currentUser != null && hasJoined &&
                    <button onClick = {clickJoinHandler}
                            className="btn btn-secondary float-end"> <>Leave</></button> }
                { currentUser != null && !hasJoined &&
                    <button onClick = {clickJoinHandler}
                            className="btn btn-success float-end"> <>Join</></button> }
              </div>
            </div>
          </div>
    );
};
export default GroupCard;