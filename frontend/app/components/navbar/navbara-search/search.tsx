"use client";

import { useState } from "react";
import "./navbarSearch.css";
import OverlayComponent from "../../overlay/overlayComponent";

const NavbarSearch = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="desktop-navbar-search-responsive">
        <input
          placeholder="چیو میخوای یاد بگیری ؟‌"
          type="text"
          className="input-navbar-list my-navbar-search-input p-3 "
        />
        <button className="button-navbar-list p-3">
          {" "}
          <i className="fas fa-search"></i>
        </button>
      </div>

      <div className={`${open ? 'z-3': '' } position-relative d-sm-none d-md-block d-xl-none d-none`}>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          style={{ width: "57px", height: "57px", borderRadius: "50%" }}
          className={`button-navbar-list ${open ? 'z-3': '' }  my-navbar-search-btn p-3`}
        >
          {" "}
          <i className="fas fa-search"></i>
        </button>

        {/* <input type="text " className={`${open? 'd-block': 'd-none'} position-absolute mt-4`} /> */}

        <div
          className={`${open ? "d-block" : "d-none"} position-absolute mt-3 d-flex`}
          style={{ left: "-20px" }}
        >
          <input
            placeholder="چیو میخوای یاد بگیری ؟‌"
            type="text"
            className="input-navbar-list p-3 "
          />
          <button className="button-navbar-list p-3 ">
            {" "}
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>

      <OverlayComponent
        classname={open ? "active" : ""}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default NavbarSearch;
