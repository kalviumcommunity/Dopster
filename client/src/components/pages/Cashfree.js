// import './App.css';
import { useState } from "react";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";

function Cashfreepage() {
  const abcd = async () => {
    const resp = await fetch(process.env.REACT_APP_API + "/cashfree", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        amount: 50,
      }),
    });
    const postjson = await resp.json();
    console.log(postjson);
    const paymentSessionId = postjson;
    const cashfree = new window.Cashfree(paymentSessionId);
    // //   console.log(cashfree);
    return cashfree.redirect();
  };
  return (
    <>
      <ResponsiveAppBar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <table>
          <tr>
            <th>Item</th>
            <th>Amount</th>
            <th>Quantity</th>
          </tr>
          <tr>
            <td>Dopster Premium</td>
            <td>INR 50</td>
            <td>1</td>
          </tr>
        </table>
        <div>
          <button onClick={abcd} className="App">
            Cashfree Payments
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cashfreepage;
