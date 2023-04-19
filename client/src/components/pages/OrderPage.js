import React, { useEffect, useState } from "react";
import Paypalbutton from "./Paypalbutton";

const OrderPage = () => {
  const product = {
    description: "Dopster Premium",
    price: 1,
  };
  return (
    <>
      <div></div>
      <div className="paypal-button-container">
        <Paypalbutton product={product} />
      </div>
    </>
  );
};

export default OrderPage;
