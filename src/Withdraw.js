import React, { useEffect, useState, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Card, { UserContext } from "./context";
import "./Dashboard.css";
import { auth, updateBalance } from "./firebase";



// let bal=0;
// let usr='';

function Withdraw(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [withdraw, setWithdraw] = useState('');
    const [btnset, setBtnSet]     = useState('false');
    const userbalance             = useContext(UserContext);
    const btnSty                  = {textAlign: "center", backgroundColor: "green", color: "antiquewhite",};

    //load user data
    const [user, loading, error]  = useAuthState(auth);

    // const [name, setName] = useState("");
  
    const navigate                = useNavigate();

    // const fetchUserName = async () => {
    //   try {
    //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    //     const doc = await getDocs(q);
    //     const data = doc.docs[0].data();

    //     bal=Number(userbalance[2]);
    //     console.log(`bal from withdraw:`, bal);
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
    setWithdraw();
    setShow(true);
  }
  
  function handlesubmit(){
      

      if(document.getElementById('withdraw').value<=0){
          alert(`Withdraw should be greater than 0 or positive.`); 
      }
      else if(document.getElementById('withdraw').value>userbalance[2]){
        alert(`Withdraw amount is an overdraft`); 
      }
      else if(isNaN(document.getElementById('withdraw').value)){
      alert(`Value should be a number.`); 
      }
      else{
        
          userbalance[2] -= Number(withdraw);
          alert(`Withdraw of amount was successful for amount $ ${withdraw}`);
          updateBalance(userbalance[1],userbalance[0],userbalance[2]);
          setShow(false);
          setBtnSet('false');
        } 
    };
   
    
    function check(){
      if(btnset==='true') return 'btn btn-primary enabled';
        return 'btn btn-primary disabled';
    }
    
    function handleChange(e){
      if(isNaN(e.target.value)){
        alert(`Input Value can only be a number `);
        e.target.value='';
        return
      }
      setBtnSet('true');
      check(btnset);
      setWithdraw(e.target.value); 
    }
    return (
      <>
      <Card
        bgcolor="light"
        border = "success"
        txtcolor="black"
        header="Withdraw"
        status={status}
        body={show ? (  
                <>
                <div className="card-body">
                 <p className="card-text">To make a withdraw from account please enter the amout below:</p>
                <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Withdraw Amount:&nbsp;$</label>
                <input  type="amount" className="form-control" id="withdraw" onChange={e => handleChange(e)}></input>
                </div><br></br>
                <a href="#withdraw" className={check()} style={btnSty} onClick={handlesubmit} >Withdraw</a>
              </div>
                </>
              ):(
                <>
                <h5>Successful Withdraw</h5>
                <button type="submit" className='btn btn-primary enabled' style={btnSty} onClick={clearForm}>Another Withdraw?</button><br></br>
                
                </>
              )}
      />
      </>
    );  
  }
  
  export default Withdraw;


{/* <button href="#withdraw" type="submit" className='btn btn-primary enabled' style={btnSty} >Withdraw?</button> */}