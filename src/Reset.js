import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "./firebase";
import "./Reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="loginContainer">
    <div className="reset">
      <div className="reset__container">
      <a href="#"><img src="./bank.png" style={{width: 250 +"px"}}></img></a><br></br>
      <h3>Please enter your email for <br></br>resetting the password.</h3><br></br>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.<br></br>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
    </div>
  );
}
export default Reset;
