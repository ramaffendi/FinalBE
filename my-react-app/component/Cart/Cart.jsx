import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../StoreContext/StoreContext";
import NavbarComponent from "../Navbar/NavbarComponent";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotal } =
    useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <>
      <NavbarComponent />
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItem[item._id] > 0) {
              return (
                <div>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItem[item._id]}</p>
                    <p>${item.price * cartItem[item._id]}</p>
                    <p
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                    >
                      x
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart total</h2>
            <div>
              <div className="cart-total-detail">
                <p>Sub total</p>
                <p>${getTotal()}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <p>Delivery fee</p>
                <p>${getTotal() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <b>Total</b>
                <b>${getTotal() === 0 ? 0 : getTotal() + 2}</b>
              </div>
            </div>
            <button onClick={() => navigate("order")}>
              PROCCED TO CHECKOUT
            </button>
          </div>
          <div className="promocode">
            <p>If you have promo code, Enter it here</p>
            <div className="cart-promo-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
