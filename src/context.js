// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import "./Dashboard.css";
// import { auth, db, logout } from "./firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";


export const UserContext = createContext(null);

// function Contx(){
//   const [user, loading, error] = useAuthState(auth);
//   const [name, setName] = useState("");
//   const [balance, setBalance] = React.useState('');
//   const navigate = useNavigate();
//   const fetchUserName = async () => {

//     try {
//       const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//       const doc = await getDocs(q);
//       const data = doc.docs[0].data();

//       setBalance(data.balance);
//       setName(data.name);
     
//     } catch (err) {
//       console.error(err);
//       alert("An error occured while fetching user data");
//     }
//   };
//   fetchUserName();
//   // console.log(`FetchUserName: ${name} , balance: ${balance}`);
// }
  





function Card(props){
    function classes(){
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
      const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
      const bord  = props.border ? ' border-' + props.border : ' ';

      return 'card mb-3 ' + bg + txt + bord;
    }
  
    return (
      <div className={classes()} style={{maxWidth: "500px", maxHeight: "500px", textAlign: "center"}}>
        <div className="card-header" style={{fontWeight: 700, fontSize: 2+"em", color: "white", backgroundColor:"#032103"}}>{props.header}</div>
        <div className="card-body">
          {props.title && (<h5 className="card-title">{props.title}</h5>)}
          {props.text && (<p className="card-text">{props.text}</p>)}
          {props.body}
          {props.status && (<div id='createStatus'>{props.status}</div>)}
        </div>
      </div>      
    );    
  }
  // export {Contx};
  export default Card;