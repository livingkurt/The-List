import React from "react";
import { Link, useLocation } from "react-router-dom";
import Title from '../Title/Title';
import './header.css'


const Header = () => {
  return (
    <ul className="nav">
      <li className="nav_items">
        <Title margin="0px">
          TheList
        </Title>
      </li>
      <li className="nav_items">
        {/* <button>Button</button> */}

      </li>
    </ul>
  );
}

export default Header;
