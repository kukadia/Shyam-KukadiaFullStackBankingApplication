
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "./Dashboard.css";
import { auth, db, logout, userData, datab } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import Card from "./context";
import {getDatabase,  ref, onValue} from "firebase/database"
import { UserContext } from "./context";

function Users(props){
    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const [balance, setBalance] = useState('');
    const [status, setStatus]     = useState('');
    const userbalance = useContext(UserContext);
    const navigate = useNavigate();
    console.log(`auth: ${JSON.stringify(auth)}`);
    console.log(`user: ${JSON.stringify(user)}`);
    console.log(`loading: ${JSON.stringify(loading)}`);
    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("email", "==", user?.email));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        console.log(`data users: ${JSON.stringify(data)}`);
        setName(data.name);
        setBalance(Number(data.balance));
       

        //Firebase Database connection


        const sRef = ref(datab, `users/${name}`);

        onValue(sRef, (snapshot) => {
          const data = snapshot.val();
          console.log(`dataElement`, data);
          
        });

      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    };
    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/");
      fetchUserName();
      // userData(user?.email);

    }, [user, loading]);

    // console.log(user);
      return(
        <>
        <Card
              bgcolor="light"
              border = "success"
              txtcolor="black"
              header="User Details"
              status={status}
              style="float: right;"
              body={ 
                      <>
                      <div className="card-body">
                      <h5 className="card-title">Logged In User: {user?.email}</h5>
                      <h5 className="card-title">User Name: {name}</h5>
                      <h5 className="card-title">Account Balance: ${balance}</h5>
                      <button className="dashboard__btn" onClick={logout}>Logout</button>
                      </div>
                      </>
                    }/>
        </>
      );
    }
    export default Users;