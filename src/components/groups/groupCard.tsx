import React, {useEffect, useState} from "react";
import GroupType from "../../modules/groupType";
import {useSelector} from "react-redux";
import {
  createGroupMember,
  getGroupsByUserId,
  leaveGroup
} from "../../services/group-members-services";
import {Link} from "react-router-dom";

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
              <Link to={`/group/${props._id}`} style={{color: 'black', textDecoration: 'none' }}>
                <div className="card-body col-9">
                  <h5 className="card-title">{props.name}</h5>
                  <p className="card-text">{props.description}</p>
                </div>
              </Link>
              <div className="float-end col-2" >
                { currentUser != null ? <button onClick = {clickJoinHandler} className="btn btn-lg btn-primary mt-4 rounded-pill">{!hasJoined ? <p>Join</p> : <p>Leave</p>}</button> : <p></p>}
              </div>
            </div>
          </div>
    );
};
export default GroupCard;