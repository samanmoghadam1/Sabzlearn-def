"use client";

import NavbarList from "../NavbarList/NavbarList";
import { useState } from "react";
import "./HamburgerButton.css";
import OverlayComponent from "../../overlay/overlayComponent";
import Link from "next/link";

// <i className="fa-solid fa-bars"></i>

const HamburgerButton = ({
  containerStyle,
  barsStyle,
  barBtnStyle,
  textsStyle,
  className,
}: {
  containerStyle?: {};
  barsStyle?: {};
  barBtnStyle?: {};
  textsStyle?: {};
  className?: string;
}) => {
  const [navbarList, setNavbarList] = useState(false);
  return (
    <>
      <div className={`haburgerContainer ${className}`} style={containerStyle}>
        <OverlayComponent
          classname={navbarList ? " active " : ""}
          open={navbarList}
          setOpen={setNavbarList}
        />
        <div style={barsStyle} className={`bars `}>
          <button
            style={barBtnStyle}
            onClick={() => {
              setNavbarList(!navbarList);
              document.body.classList.toggle("body-background-for-navbar-list");
            }}
            className="bar-btn border-0 p-3 rounded-circle"
          >
            <i
              className={`fa-solid fa-bars ${
                !barBtnStyle ? "text-secondary" : "text-white"
              }`}
            ></i>
          </button>

          <NavbarList
            navbarListState={navbarList}
            setNavbarListState={setNavbarList}
          />
        </div>
      </div>
      <div className="d-none d-md-flex  align-items-center text-white gap-3 hamburger-list-inline">
        <Link href={"/"}>
          <svg
            width={70}
            className="d-sm-none d-md-block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 20 1020 750"
          >
            <polygon
              fill="#006537"
              points="484.34,567.41 300.6,663.13 236.63,624.86 236.69,469.22"
            ></polygon>
            <polygon
              fill="#1EB35B"
              points="817.97,393.27 817.92,534.3 477.61,768.96 300.6,663.13"
            ></polygon>
            <polygon
              fill="#006869"
              points="974.76,213.51 484.22,469.62 7.91,280.8 498.52,24.73"
            ></polygon>
            <line
              fill="#1A3D3D"
              x1="931.68"
              y1="313.64"
              x2="931.59"
              y2="313.82"
            ></line>
            <polygon
              fill="#006869"
              points="1012.54,583.89 953.38,640.76 898.07,579.95 936.04,543.43 936.06,233.71 974.75,213.5 974.46,542.02"
            ></polygon>
            <polygon
              fill="#004842"
              points="974.76,213.51 974.66,315.72 936.05,335.88 936.06,233.72"
            ></polygon>
          </svg>
        </Link>

        <Link style={textsStyle} href={"/courses"}>
          <span>دوره های آموزشی</span>
        </Link>
        <Link style={textsStyle} href={"/courses"}>
          <span>همه دوره ها</span>
        </Link>
        <Link style={textsStyle} href={"/courses"}>
          <span>مقالات</span>
        </Link>
      </div>
    </>
  );
};

export default HamburgerButton;
