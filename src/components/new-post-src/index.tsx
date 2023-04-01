import React from "react";

const NewPostSrc = () => {
  return(
      <div className="container">
        <div className="row">
          <p>Write a post:</p>
          <div className="col-6">
            <button type="button" className="btn btn-success">Start</button>
          </div>
          <div className="col-6">
            <button type="button" className="btn btn-success float-end">Stop</button>
          </div>
        </div>
      </div>
  );
};
export default NewPostSrc;