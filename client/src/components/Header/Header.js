import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Title from '../Title/Title';
import ButtonSym from '../Title/Title';
import './header.css'


const Header = (props) => {


  return (
    <ul className="nav">
      <li className="nav_items">
        {props.children}
        {/* <button onClick={props.sidebar_show_hide} className="nav_button"><i className="fas fa-bars"></i></button> */}
      </li>
    </ul>
  );
}

export default Header;
