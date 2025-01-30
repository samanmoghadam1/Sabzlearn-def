"use client";

import { CourseItemInterface } from "@/app/courses/page";
import "./CourseFilters.css";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import customFetch from "@/app/utils/custom_fetch";

const CourseFilters = ({
  courses,
  setCourses,
  originalCourses,
}: {
  originalCourses: CourseItemInterface[];
  courses: CourseItemInterface[];
  setCourses: (item: CourseItemInterface[]) => void;
}) => {
  const [filters, setFilters] = useState({
    free: false,
    purchased: false,
  });
  const [open, setOpen] = useState(false);

  const applyFilters = async (e: React.FormEvent) => {
    e.preventDefault();

    let filteredCourses = [...originalCourses];
    console.log("orifinal is: ", filteredCourses);
    if (filters.free) {
      filteredCourses = filteredCourses.filter((course) => course.free);
    }

    if (filters.purchased) {
      const response: CourseItemInterface[] = await customFetch(
        "http://127.0.0.1:8000/orders/purchased_courses/list/",
        "GET",
        undefined,
        { cache: "no-store" }
      );

      filteredCourses = filteredCourses.filter((course) =>
        response.some(
          (purchasedCourse: any) => purchasedCourse.course === course.id
        )
      );
    }

    setCourses(filteredCourses);
    setOpen(false);
  };

  const clearFilters = () => {
    setFilters({ free: false, purchased: false });
    setCourses(originalCourses);
  };

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
        onClick={() => setOpen(true)}
        role="button"
        className="bg-white p-3 px-5 rounded-2 w-50 text-center"
      >
        <i className="fa-solid fa-filter"></i>
        <span className="mx-3">فیلتر</span>
      </div>

      <div
        className={`position-fixed courses-filter-container bg-white h-100 z-3 h6 ${
          open ? "fade-in" : "fade-out"
        }`}
        style={{ width: "98%", top: "0" }}
      >
        {/* Header */}
        <div className="course-filter-nav d-flex justify-content-between px-3 pb-3">
          <span className="fw-bold">
            <i
              onClick={() => setOpen(false)}
              className="fa-solid fa-xmark mx-2 mt-4 border border-black rounded-circle"
              style={{
                width: "19px",
                height: "19px",
                textAlign: "center",
                cursor: "pointer",
              }}
            ></i>
            <span>فیلتر ها</span>
          </span>

          <span
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={clearFilters}
          >
            <span>حذف فیلتر ها</span>
            <i className="fa-regular fa-trash-can mx-2 mt-4 border-4 rounded-circle"></i>
          </span>
        </div>

        {/* Filters */}
        <div className="d-flex flex-column">
          <span className="d-flex justify-content-between border-bottom p-4">
            <span className="fw-bold opacity-75">فقط دوره های رایگان</span>
            <Form.Check
              type="switch"
              id="free-courses-switch"
              label=""
              className="h3"
              checked={filters.free}
              onChange={(e) =>
                setFilters({ ...filters, free: e.target.checked })
              }
            />
          </span>

          <span className="d-flex justify-content-between border-bottom p-4">
            <span className="fw-bold opacity-75">دوره ها خریداری شده</span>
            <Form.Check
              type="switch"
              id="purchased-courses-switch"
              label=""
              className="h3"
              checked={filters.purchased}
              onChange={(e) =>
                setFilters({ ...filters, purchased: e.target.checked })
              }
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
            onClick={applyFilters}
          >
            اعمال فیلتر ها
          </button>
        </div>
      </div>
    </>
  );
};

export default CourseFilters;
