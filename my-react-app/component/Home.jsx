import React, { useState } from "react";
import NavbarComponent from "./Navbar/NavbarComponent";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import ExploreMenu from "./ExploreMenu/ExploreMenu";
import Display from "./FoodDisplay/Display";
import AppDownload from "./AppDownload/AppDownload";
import Login from "../auth/Login";
// import Coba from "./cobaCoba/Coba"


const Home = () => {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);
const [isLogin,setIsLogin] = useState(false)

  const handleLoginSuccess = () => {
    setShowLogin(false); 
    setIsLogin(true)
  };

  return (
    <>
       {showLogin && <Login onLoginSuccess={handleLoginSuccess} />}
      <div
        className="home"
        style={{ paddingLeft: "70px", paddingRight: "70px" }}
      >
        <NavbarComponent setShowLogin={setShowLogin} isLogin={isLogin}/>
        <Header />
        <ExploreMenu category={category} setCategory={setCategory} />
        <Display category={category} />


      {/* <Coba /> */}
      
        <AppDownload />
      </div>
      <Footer />
    </>
  );
};

export default Home;
