// import './App.css';
import { useState } from "react";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
import { PayPalButtons } from "@paypal/react-paypal-js";
function Cashfreepage() {
  const [paidFor, setPaidFor] = useState(false);

  const handleApprove = (orderId) => {
    setPaidFor(true);
  };
  if (paidFor) {
    alert("Thanks for the purchase");
  }
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
        <div
          style={{
            marginTop: "2vh",
            display: "flex",
            flexDirection: "column",
            gap: "1vh",
          }}
        >
          <PayPalButtons
            style={{
              color: "silver",
              layout: "horizontal",
              height: 48,
              shape: "pill",
              tagline: false,
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: "Dopster Premium",
                    amount: {
                      value: 50,
                    },
                  },
                ],
              });
            }}
            onClick={(data, actions) => {}}
            onApprove={async (data, actions) => {
              const order = await actions.order.capture();
              console.log(order);
              handleApprove(data.orderID);
            }}
            onError={(err) => {
              console.log("error");
            }}
          />
          <button
            style={{
              width: "fit-content",
              paddingLeft: "20px",
              paddingRight: "20px",
              borderRadius: "25px",
              fontWeight: "bold",
            }}
            onClick={abcd}
            className="App"
          >
            Cashfree Payments
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Cashfreepage;
