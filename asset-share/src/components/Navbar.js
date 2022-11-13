import React from "react";
import logo from "../assets/logo.png";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="flex flex-row p-4 items-center justify-between">
      <div className="flex flex-row items-center">
        <img src={logo} />
        <h1 className="text-white text-2xl ml-4 font-semibold flex flex-row font-poppins">
          Block <h1 className="font-light"> Crate</h1>
        </h1>
      </div>
      <div className="flex flex-row items-center flex-1 justify-evenly">
        <h1 className="text-white text-xl">Home</h1>
        <h1 className="text-white text-xl">Assets</h1>
        <h1 className="text-white text-xl">Chat</h1>
        <h1 className="text-white text-xl">News Feed</h1>
      </div>
    </div>
  );
};

export default Navbar;
