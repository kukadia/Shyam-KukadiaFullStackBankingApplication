import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
    if (!name) alert("Error: Input Name");
    if (!email) alert("Error: Input Email");
    if (!password) alert("Error: Input Password");
    if(name && email && password){
      registerWithEmailAndPassword(name, email, password);
      alert(`Account for ${email}, created successfully!`);
    }
    
  };
  // function handlePassword(e){
  //   if(e.target.value.length<8){
  //     alert();
  //   }
  // }
  useEffect(() => {
    if (loading) return;
    if (user) history("/dashboard");
  }, [user, loading]);
  return (
    <>
    
    <div className="loginContainer">
    <div className="register">
      <div className="register__container">
      <a href="#"><img src="./bank.png" style={{width: 250 +"px"}}></img></a><br></br>
      <h3>Please register your account.</h3><br></br>
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
    </div>
    </>
  );
}
export default Register;