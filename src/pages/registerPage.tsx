import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerThunk } from "../services/auth-thunks";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");;
  const [registerRole, setRegisterRole] = useState("");

  // HANDLES REGISTERING NEW USERS
  const handleRegister = async () => {
    try {
      const {payload} = await dispatch(registerThunk({ 
        username: registerUsername, 
        password: registerPassword,
        firstName: registerFirstName,
        lastName: registerLastName,
        email: registerEmail,
        createdAt: new Date(),
        role: registerRole,
        avatar: ""
      }));
      if(payload) {
        navigate("/profile");
      } else {
        alert(`Username: ${registerUsername} already exists`);
      }
    } catch (e) {
      alert (e);
    }
  }

  return (
    <div className={"container"}>
      {/* FORM FOR REGISTERING USERS */}
      <h1>Register Screen</h1>
      <div>
        <Link to="/login">
          Already have an account? Login here.
        </Link>
      </div> 
      <br/>
      <div className="row">
        <div className ="col-6">
          <label>First Name</label>
          <input className="form-control"
                 type="text" value={registerFirstName}
                 onChange={(event) => setRegisterFirstName(event.target.value)}
          />
        </div>
        <div className ="col-6">
          <label>Last Name</label>
          <input className="form-control"
                 type="text" value={registerLastName}
                 onChange={(event) => setRegisterLastName(event.target.value)}
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <input className="form-control"
               type="text" value={registerEmail}
               onChange={(event) => setRegisterEmail(event.target.value)}
        />
      </div>
      <label>Role</label>
      <div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions"
               id="inlineRadio2" value="user"
               onClick={(event) => setRegisterRole("user")}/>
        <label className="form-check-label" htmlFor="inlineRadio2">User</label>
      </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="inlineRadioOptions"
                 id="inlineRadio1" value="admin"
                 onClick={(event) => setRegisterRole("admin")}/>
          <label className="form-check-label" htmlFor="inlineRadio1">Admin</label>
        </div>
        <label>(Note: Admin members can edit groups and moderate posts)</label>
      </div>
      <div>
        <label>Username</label>
        <input className="form-control"
        type="text" value={registerUsername}
        onChange={(event) => setRegisterUsername(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input className="form-control"
          type="password" value={registerPassword}
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
      </div>
      <button className={"btn my-2 btn-primary rounded"}onClick={handleRegister}>
        Register
      </button>
      <br/>
      <br/>
      <div>
        <Link to="/feed">Or, Continue as Guest</Link>
      </div>
    </div>
  )
}

export default RegisterPage;