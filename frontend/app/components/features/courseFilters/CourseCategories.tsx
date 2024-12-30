"use client";
import { useState } from "react";
import OverlayComponent from "../../overlay/overlayComponent";

const CourseCategories = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        role="button"
        className="bg-white p-3 px-5 rounded-5 w-50"
      >
        <i className="fa-solid fa-sort"></i>
        <span className="mx-2">همه دوره ها</span>
      </div>

      {open && (
        <>
          <div className=" w-100  z-3 fixed-bottom">
            <div className="sorted-by-categories">
              <div className="course-filter-nav  d-flex justify-content-between px-3 p-2 rounded-top-4">
                <span className="fw-bold p-3">مرتب سازی بر اساس</span>
                <span className="fw-bold">
                  <i
                    onClick={() => setOpen(false)}
                    style={{
                      width: "19px",
                      height: "19px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    className="fa-solid fa-xmark mx-2 mt-4 border border-black rounded-circle"
                  ></i>
                </span>
              </div>

              <div className="bg-white">
                <span className="d-flex justify-content-between border-bottom p-4">
                  <span className="opacity-75">
                    همه دوره ها
                  </span>
                  <i
                    style={{
                      width: "19px",
                      height: "19px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    className="fa-solid fa-check text-success border border-success p-2 d-flex justify-content-center align-items-center rounded-circle"
                  ></i>
                </span>
                {/*  */}
                <span className="d-flex justify-content-between border-bottom p-4">
                  <span className="opacity-75">
                    ارزان ترین
                  </span>
                  
                </span>
                {/*  */}
                <span className="d-flex justify-content-between border-bottom p-4">
                  <span className="opacity-75">
                    گران ترین
                  </span>
                  
                </span>
                {/*  */}
                <span className="d-flex justify-content-between border-bottom p-4">
                  <span className="opacity-75">
                    پرمخاطب ترین
                  </span>
                  
                </span>
                {/*  */}
              </div>
            </div>
          </div>
          <OverlayComponent open={open} setOpen={setOpen} classname="active"/>
        </>
      )}
    </>
  );
};

export default CourseCategories;
