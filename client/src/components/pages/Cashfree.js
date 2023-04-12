// import './App.css';
import { useState } from 'react';


function Cashfreepage() {

    const abcd = async ()=>{
        const resp = await fetch("http://localhost:7000/cashfree", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              amount:10
            }),
          })
          const postjson = await resp.json()
          console.log(postjson)
          const paymentSessionId = postjson;
          const cashfree = new window.Cashfree(paymentSessionId);
        // //   console.log(cashfree);
          return cashfree.redirect()

    }
  return (
    <button onClick={abcd}  className="App">
        Cashfree Payments
    </button>
  );
}

export default Cashfreepage;