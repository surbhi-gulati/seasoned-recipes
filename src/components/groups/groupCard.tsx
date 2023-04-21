import React from "react";
import GroupType from "../../modules/groupType";
import {useSelector} from "react-redux";
import {createGroupMember} from "../../services/group-members-services";

const GroupCard = (props: GroupType) => {

  const {currentUser} = useSelector((state: any) => state.auth);
  const clickPostHandler = async () => {
    try {
      await createGroupMember(props._id, currentUser._id);
    } catch (e) {
      alert(e);
    }
  };
    return (
    <div className="card my-3">
      <div className="my-2"> 
        <img 
          className="card-img mt-2" 
          src={`${props.image}`} 
          alt={props.name} />
      </div>
      <div className="row">
        <div className="card-body col-9">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <div className="float-end col-2" >
          { currentUser != null ? <button onClick = {clickPostHandler} className="btn btn-lg btn-primary mt-4 rounded-pill">Join</button> : <p></p>}
        </div>
      </div>
    </div>
    );
};
export default GroupCard;