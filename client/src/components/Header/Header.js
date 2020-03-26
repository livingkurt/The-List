import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Title from '../Title/Title';
import './header.css'


const Header = (props) => {

  const [sidebar_state, set_sidebar_state] = useState(false)

  // const openMenu = () => {
  //   document.querySelector(".sidebar").classList.add("open");
  // }
  // const closeMenu = () => {
  //   document.querySelector(".sidebar").classList.remove("open")
  // }

  const sidebar_show_hide = () => {
    if (sidebar_state) {
      document.querySelector(".sidebar").classList.add("open");
      set_sidebar_state(false)
    }
    else if (sidebar_state) {
      document.querySelector(".sidebar").classList.remove("open");
      set_sidebar_state(false)
    }
  }

  return (
    <ul className="nav">
      <li className="nav_items">
        {props.children}
        <button onClick={props.sidebar_show_hide} className="nav_button"><i class="fas fa-bars"></i></button>
      </li>
      <li className="nav_items">
        {/* <button>Button</button> */}

      </li>
    </ul>
  );
}

export default Header;
