import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Signup from "../auth/Signup.jsx";
import Home from "../component/Home.jsx";
import Order from "../component/PlaceOrder/PlaceOrder.jsx";
import Cart from "../component/Cart/Cart.jsx";

const App = () => {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart/order" element={<Order />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
