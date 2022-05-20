import React from 'react'
import Card from './context';
import Deposit from './Deposit';
import Withdraw from './Withdraw';

function Home() {
  return (
    <>
    <Card
      bgcolor="light"
      style={{textAlign: "center"}}
      border = "success"
      txtcolor="black"
      header="Kukadia BadBank Landing Module"
      title="Welcome to the Kukadia bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    /> 
    {/* <Deposit/>
    <Withdraw/> */}
    </>
  )
}

export default Home;