import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../src/assets/assets";
import "./style/Comp.css";
import { StoreContext } from "../StoreContext/StoreContext";

const NavbarComponent = ({ setShowLogin, isLogin }) => {
  const [menu, setMenu] = useState("home");
  const {getTotal} = useContext(StoreContext)

  const handleLoginLogout = () => {
    if (isLogin) {
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} className="logo" />{" "}
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          contact us
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          mobile app
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />{" "}
          </Link>
          <div className={getTotal() === 0 ? '':'dot'}></div>
        </div>
        <button onClick={handleLoginLogout}>
          {isLogin ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
