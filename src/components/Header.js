import React, { Component } from "react";
import headerBanner from "../assets/headerBanner.jpg";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div>
      <div className="flex justify-center">
        <img src={headerBanner} alt="" className="object-cover h-56 w-1/3" />
      </div>
      <div className="h-14 bg-gray-200 flex px-4 border border-gray-400 mx-2 items-center space-x-10">
        <div className="flex items-center -mt-44 w-40">
          <img
            src={logo}
            alt=""
            className="h-40 bg-white border border-gray-400"
          />
          <span className="ml-10 text-lg font-medium text-gray-900">KOMC</span>
        </div>
        <a class="active" href="#home">
          Home
        </a>
        <a href="#menu">Menu</a>
        <a href="#about">About Us</a>
      </div>
    </div>
  );
};

export default Header;