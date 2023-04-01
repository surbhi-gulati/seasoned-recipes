import React from "react";
import Group from "../modules/groupType";

const GroupPage = (props: Group) => {    
    return (
    <div>
      <div className="card py-2 my-3" key={props._id}> 
      <img 
        className="card-img mt-2" 
        src={require(`../data/groups/${props.image}`)} 
        alt="Card image cap" />
      </div>
      <div className="row">
        <div className="card-body col-9 float">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <div className="float-end col-2" >
          <button className="btn btn-lg btn-primary mt-4 rounded-pill">Join</button>
        </div>
      </div>
    </div>
    );
};


export default GroupPage;