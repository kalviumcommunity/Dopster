import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/payresult.css";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
const Payresult = () => {
  const [payStatus, setPayStatus] = useState([]);
  const { orderid } = useParams();
  useEffect(() => {
    const getPayStatus = async () => {
      const resp = await fetch("http://localhost:7000/payment-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          orderid,
        }),
      });
      const postjson = await resp.json();
      console.log(postjson);
      setPayStatus(postjson);
    };
    getPayStatus();
  }, []);
  return (
    <>
<ResponsiveAppBar/>
    <div  id="summary-div">
      <h1></h1>
      Order Summery
      <table>
        <tr>
          <th>Amount</th>
          <th>Status</th>
          <th>Order Id</th>
        </tr>
        <tr>
          <td>
            {payStatus.order_amount} {payStatus.order_currency}
          </td>
          <td
            style={{
              color: payStatus.order_status === "PAID" ? "green" : "red",
            }}
          >
            {payStatus.order_status}
          </td>
          <td> {payStatus.order_id}</td>
        </tr>
      </table>
    </div>
    <Footer/>
    </>
  );
};

export default Payresult;