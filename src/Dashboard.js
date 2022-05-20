import React, { useEffect, useMemo, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import NavBar from "./navbar";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Transactions from "./Transactions";
import Home from './Home'
import { UserContext } from "./context";
import Card from "./context";

function Dashboard() {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(null);

  const [show, setShow]         = useState(true);
  const [showHome, setShowHome]         = useState(true);

  const providerValue = useMemo(() => ([email,name,balance]), [balance, setBalance]);
  console.log(`providerValue: ${providerValue[0]}`);
  const navigate = useNavigate();
  const fetchUserName = async () => {
    // try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(`data in Dashboard:`, data);
      setName(data.name);
      setBalance(data.balance);
      setEmail(data.email);
      
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data: dashboard");
  //   }
  };
  fetchUserName();
  // setTimeout(() => fetchUserName(),200);
  
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    
  }, [user, loading]);

  function handlesubmitDeposit(){

    // if(show===true) setShow(false);
    // if(show===false) setShow(true);
    setShowHome(false);
    setShow(true);
        
        
      } 
    function handlesubmitWithdraw(){

        // if(show===true) setShow(false);
        // if(show===false) setShow(true);
        setShowHome(false);
        setShow(false);
            
            
          } 
  
          function handlesubmitHome(){

            // if(show===true) setShow(false);
            // if(show===false) setShow(true);
            if(showHome)
            {
              alert("You are already at home module!");
              return
            }
            setShowHome(true);
            setShow(false);
                
                
              } 


  return (
    <>
    <div className="dashboardContainer">
          <UserContext.Provider value={providerValue}>
             
          <NavBar/>
          <div className="parent" style={{textAlign: "center"}}>
          <div className='child'> 
          <Card
        bgcolor="light"
        border = "success"
        txtcolor="black"
        header="Welcome to Kukadia Bank"
        status=''
        body={showHome ? (
        <>
        <button className="dw" onClick={handlesubmitHome} >Home</button>&nbsp;&nbsp;
        <button className="dw" onClick={handlesubmitDeposit} >Deposit</button>&nbsp;&nbsp;
        <button className="dw" onClick={handlesubmitWithdraw} >Withdraw</button>
        <div className='child'><Home/></div>
        
        </>
         ):( show ? (<>
         
         <button className="dw" onClick={handlesubmitHome} >Home</button> &nbsp;&nbsp;  <button className="dw" onClick={handlesubmitWithdraw} >Withdraw</button> 
          <div className='child'><Deposit/></div>
          </>):(<>
          
          <button className="dw" onClick={handlesubmitHome} >Home</button> &nbsp;&nbsp; <button className="dw" onClick={handlesubmitDeposit} >Deposit</button>
          <div className='child'><Withdraw/></div>
          
          </>)
                
              )}
      /> </div>
            </div>
            

           
                              {/* <div className='parent' style={{textAlign: "center"}}>
                                      <div className='child'> 
                                                <div className='child'> <Home/></div>
                                                <div className='child'> <Deposit/></div>
                                                <div className='child'><Withdraw/></div>
                                                <div className='child'><Users/></div>
                                                <div className='child'><Transactions/></div>
                                        </div>
                                </div> */}
            {/* <Routes>
              <Route exact path="/" element= {<Home/>} />
              <Route  path="#deposit" element= {<Deposit/>} />
            </Routes>
          */}
         </UserContext.Provider>
         </div>
         </>
  );
}
export default Dashboard;