import React, { useEffect, useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Card, { UserContext } from "./context";
import "./Dashboard.css";
import { auth, updateBalance } from "./firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";


// let bal=0;
// let usr='';

function Deposit(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [deposit, setDeposit]  = useState('');
    const [btnset, setBtnSet] = useState('false');
    const userbalance = useContext(UserContext);
    const btnSty = {
      textAlign: "center", backgroundColor: "green", color: "antiquewhite",
    };

    //load user data
    const [user, loading] = useAuthState(auth);
    // const [name, setName] = useState("");
  
    const navigate = useNavigate();
    // const fetchUserName = async () => {
    //   try {
    //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    //     const doc = await getDocs(q);
    //     const data = doc.docs[0].data();
    //     console.log(`UserBalance Deposit: ${Number(userbalance[2])}`);
    //     bal=Number(userbalance[2]);
    //     usr=data.email;

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

    //load user data end

  // function validate(field, label){
  //     if (!field) {
  //       setStatus('Error: ' + label);
  //       setTimeout(() => setStatus(''),3000);
  //       return false;
  //     }
  //     return true;
  // }
  
  function clearForm(){
    setDeposit();
    setShow(true);
  }
  
  function handlesubmit(){
      
      // setWithdraw(Number(document.getElementById("deposit").value));
      if(document.getElementById('deposit').value<=0){
          alert(`Deposit should be greater than 0 or positive.`); 
      }
      else if(isNaN(document.getElementById('deposit').value)){
      alert(`Value should be a number.`); 
      }
      else{
        userbalance[2] += Number(deposit);
          alert(`Deposit of amount was successful for amount $ ${deposit}`);
          updateBalance(userbalance[1],userbalance[0],userbalance[2]);
          setShow(false);
          setBtnSet('false');
          
          
        } 
    };
   

    function check(){
      if(btnset=='true') return 'btn btn-primary enabled';
        return 'btn btn-primary disabled';
    }
    
    function handleChange(e){
      setBtnSet('true');
      check(btnset);
      setDeposit(e.target.value); 
    }
    return (
   
      <Card
        bgcolor="light"
        border = "success"
        txtcolor="black"
        header="Deposit"
        status={status}
        body={show ? (  
                <>
                <div className="card-body">
                
                <p className="card-text">To make a deposit to account please enter the amout below:</p>
                <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Deposit Amount:</label>
                <input  type="amount" className="form-control" id="deposit" onChange={e => handleChange(e)}></input>
                </div><br></br>
                <a href="#deposit" className={check()} style={btnSty} onClick={handlesubmit} >Deposit</a>
              </div>
                </>
              ):(
                <>
                <h5>Successful Deposit</h5>
                <button type="submit" className='btn btn-primary enabled' style={btnSty} onClick={clearForm}>Another Deposit?</button><br></br>
                
                </>
              )}
      />
     
    );  
  }
  
  export default Deposit;


 