"use client";

import "./CourseFilters.css";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const CourseFilters = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [open]);

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
        role="button"
        className="bg-white p-3 px-5 rounded-5 w-50 text-center"
      >
        <i className="fa-solid fa-filter"></i>
        <span className="mx-3">فیلتر</span>
      </div>

      <div
        style={{
          width: "98%",
          top: "0",
        }}
        className={` 
          position-fixed
          courses-filter-container
          bg-white
          position-absolute
          h-100 z-3 
          h6  ${open ? "fade-in" : "fade-out"}
          `}
      >
        {/* Nav Filter */}
        <div
          className="
            course-filter-nav 
            d-flex justify-content-between
            px-3 pb-3
          "
        >
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
            <span>فیلتر ها</span>
          </span>

          <span className="text-danger">
            <span>حذف فیلتر ها</span>
            <i className="fa-regular fa-trash-can mx-2 mt-4 border-4 rounded-circle"></i>
          </span>
        </div>

        {/* Main */}
        <div className="d-flex flex-column">
          <span className="d-flex justify-content-between border-bottom p-4">
            <span className="fw-bold opacity-75">فقط دوره های رایگان</span>
            <Form.Check
              type="switch"
              id="free-courses-switch"
              label=""
              className="h3"
            />
          </span>

          <span className="d-flex justify-content-between border-bottom p-4">
            <span className="fw-bold opacity-75">در حال پیش فروش</span>
            <Form.Check
              type="switch"
              id="pre-sale-switch"
              label=""
              className="h3"
            />
          </span>

          <span className="d-flex justify-content-between border-bottom p-4">
            <span className="fw-bold opacity-75">دوره ها خریداری شده</span>
            <Form.Check
              type="switch"
              id="purchased-courses-switch"
              label=""
              className="h3"
            />
          </span>
        </div>

        {/* Apply Button */}
        <div
          className="d-block position-absolute w-100 m-auto text-center"
          style={{ bottom: "20px" }}
        >
          <button
            className="p-3 w-75 border-0 rounded-5 text-white"
            style={{ backgroundColor: "rgb(34 197 94)", fontSize: "20px" }}
          >
            اعمال فیلتر ها
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseFilters;
