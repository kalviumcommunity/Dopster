import React, { useState } from "react";

import { PayPalButtons } from "@paypal/react-paypal-js";

const Paypalbutton = (props) => {
  const { product } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState("");
  const handleApprove = (orderId) => {
    setPaidFor(true);
  };
  if (paidFor) {
    alert("Thanks for the purchase");
  }
  return (
    <>
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
                description: product.description,
                amount: {
                  value: product.price,
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
          setError(err);
          console.log("error", err);
        }}
      />
    </>
  );
};

export default Paypalbutton;
