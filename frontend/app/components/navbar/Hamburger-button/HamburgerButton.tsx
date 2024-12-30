"use client";

import NavbarList from "../NavbarList/NavbarList";
import { useState } from "react";
import "./HamburgerButton.css";
import OverlayComponent from "../../overlay/overlayComponent";

// <i className="fa-solid fa-bars"></i>

const HamburgerButton = ({
  containerStyle,
  barsStyle,
  barBtnStyle
}: {
  containerStyle?: {};
  barsStyle?: {};
  barBtnStyle?: {};
}) => {
  const [navbarList, setNavbarList] = useState(false);
  return (
    <div style={containerStyle}>
      <OverlayComponent
        classname={navbarList ? " active " : ""}
        open={navbarList}
        setOpen={setNavbarList}
      />
      <div style={barsStyle} className="bars">
        <button
          style={barBtnStyle}
          onClick={() => {
            setNavbarList(!navbarList);
            document.body.classList.toggle("body-background-for-navbar-list");
          }}
          className="bar-btn border-0 p-3 rounded-circle"
        >
          <i  className={`fa-solid fa-bars ${!barBtnStyle ? 'text-secondary' : 'text-white'}`}></i>
        </button>

        <NavbarList
          navbarListState={navbarList}
          setNavbarListState={setNavbarList}
        />
      </div>
    </div>
  );
};

export default HamburgerButton;
