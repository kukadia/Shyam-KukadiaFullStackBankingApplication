
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { UserContext } from "./context";


function NavBar(props){
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState('');
    const userbalance = useContext(UserContext);
    console.log(`userbalance navbar:`, userbalance);
    const navigate = useNavigate();
    // const fetchUserName = async () => {
    //   try {
    //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    //     const doc = await getDocs(q);
    //     const data = doc.docs[0].data();
    //     // console.log(`Data: ${JSON.stringify(data)}`);
    //     // console.log(`Data.balance: ${data.balance}`);
    //     setBalance(data.balance);
    //     // console.log(`Balance: ${balance}`);
    //     setName(data.name);
    //   } catch (err) {
    //     console.error(err);
    //     alert("An error occured while fetching user data");
    //   }
    // };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      // fetchUserName();
    }, [user, loading]);

    console.log(user);
      return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#"><img src="./bank.png" style={{width: 250 +"px", marginLeft: "20px"}}></img></a>
          {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* <div className="collapse navbar-collapse" id="navbarNav" style={{align: "right"}}>
            <ul className="navbar-nav" style={{textAlign: "right"}}>
              <li className="nav-item">
                <a className="nav-link" href="#/CreateAccount/">Create Account</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/login/">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#deposit">Deposit</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/withdraw/">Withdraw</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/balance/">Balance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#/alldata/">All Data</a>
              </li>          
            </ul>
          </div> */}

          <div style={{marginLeft: 'auto', marginRight: "20px"}}>
            {/* <h1>Welcome to Kukadia bank</h1> */}
            <h4 className="username"><h5><a>{userbalance[0]}<br/>
            ({userbalance[1]})</a></h5>&nbsp; 
            Balance: $ <a>{userbalance[2]}</a>&nbsp;&nbsp;<button className="dashboard__btn" onClick={logout}>Logout</button></h4>
            
            
          </div>

        </nav>
  
        
        </>
      );
    }
    export default NavBar;

//     <div className="username">
//     <a>{user?.email}</a><br/>
//     <a>{name}</a><br/>
    
// </div>
