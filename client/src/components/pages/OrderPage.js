import React, { useEffect, useState } from "react";
import Paypalbutton from "./Paypalbutton";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
const OrderPage = () => {
  const product = {
    description: "Dopster Premium",
    price: 1,
  };
  const abcd = async ()=>{
    const resp = await fetch(process.env.REACT_APP_API+"/cashfree", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          amount:50
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
    <>
      <ResponsiveAppBar />
      <div>

     
      <div>
        <table>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Order Id</th>
          </tr>
          <tr>
            <td>Dopster Premium</td>
            <td>INR 50</td>
            <td> 1</td>
          </tr>
        </table>
      </div>
      <div className="paypal-button-container">
        <Paypalbutton product={product} />
      </div>
      <div>
    <button onClick={abcd}  className="App">
        Cashfree Payments
    </button>
    </div>
    </div>
      <Footer />
    </>
  );
};

export default OrderPage;
