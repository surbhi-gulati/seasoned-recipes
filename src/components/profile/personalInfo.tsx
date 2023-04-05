import React from "react";

const PersonalInfo = () => {    
    return (
        <div className="container-fluid">
            <p> Personal Information </p>
            <span className="col-xs-4">
                <p> Name </p>
                <i className="bi bi-pen"></i>
            </span>
            <span className="col-xs-4">
                <p> Email </p> 
                <i className="bi bi-pen"></i>
            </span>
            <span className="col-xs-4">
                <p> Phone </p> 
                <i className="bi bi-pen"></i>
            </span>
        </div>
    );
};

export default PersonalInfo;
