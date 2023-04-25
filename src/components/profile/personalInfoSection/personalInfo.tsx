import React, {useEffect} from "react";
import {login, logout, updateUser} from "../../../services/auth-services";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../../services/auth-thunks";

const PersonalInfo = () => {
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [isDoneEditing, setIsDoneEditing] = React.useState(false);
  const [editedName, setEditedName] = React.useState({firstName: currentUser.firstName, lastName: currentUser.lastName});
  const [isEditingEmail, setIsEditingEmail] = React.useState(false);
  const [editedEmail, setEditedEmail] = React.useState(currentUser.email);
  const refreshUserInfo = async () => {
    await dispatch(loginThunk( {username: currentUser.username, password: currentUser.password}));
  }
  const dispatch = useDispatch<any>();
  useEffect(() => {
    refreshUserInfo();
  }, [isDoneEditing])
    return (
        <>
            <h2> Personal Details </h2>
            <div className="d-flex">
                <i className="bi bi-lock me-2"></i>
                <p>This section is only visible to you.</p>
            </div>
            <span className="d-flex">
              { isEditingName ? (<div className="row">
                <div className ="col-5">
                  <label>First Name</label>
                  <input className="form-control"
                           type="text" defaultValue={editedName.firstName}
                         onChange={(event)=> {
                          setEditedName({...editedName, firstName: event.target.value});
                         }}
                  />
                </div>
                <div className ="col-5">
                  <label>Last Name</label>
                  <input className="form-control"
                         type="text" defaultValue={editedName.lastName}
                         onChange={(event)=> {
                           setEditedName({...editedName, lastName: event.target.value});
                         }}
                  />
                </div>
                <button onClick = { async () => {
                  const newUser = {...currentUser, firstName: editedName.firstName, lastName: editedName.lastName};
                  await updateUser(newUser);
                  setIsEditingName(false);
                  setIsDoneEditing(true);
                }} type="button" className="btn btn-success col-2">Save</button>
              </div>)
                  :
                  (<>
                    <p> Name: {editedName.firstName} {editedName.lastName}</p>&nbsp;
                    <i className="bi bi-pen-fill"
                       onClick={() => {
                         setIsEditingName(true);
                         setIsDoneEditing(false);
                       }}></i>
                  </>)
              }
            </span>
          <span className="d-flex">
            {isEditingEmail ? (<div className="row">
                  <div className="col-8">
                    <label>Email</label>
                    <input className="form-control"
                           type="text" defaultValue={editedEmail}
                           onChange={(event) => setEditedEmail(event.target.value)}
                    />
                  </div>
                  <button onClick = { async () => {
                    const newUser = {
                      ...currentUser,
                      email: editedEmail,
                    };
                    await updateUser(newUser);
                    setIsEditingEmail(false);
                    setIsDoneEditing(true);
                  }} type="button" className="btn btn-success col-2">Save</button>
                </div>)
                :
                (<>
                  <p> Email: {editedEmail}</p>&nbsp; <i
                    className="bi bi-pen-fill"
                    onClick={() => {
                      setIsEditingEmail(true);
                      setIsDoneEditing(false);
                    }}></i>
                </>)
            }
          </span>
        </>
    );
};

export default PersonalInfo;
