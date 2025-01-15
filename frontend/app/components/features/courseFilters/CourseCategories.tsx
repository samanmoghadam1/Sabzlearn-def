"use client";

import { useState } from "react";
import OverlayComponent from "../../overlay/overlayComponent";
import { CourseItemInterface } from "@/app/courses/page";

const CourseCategories = ({
  courses,
  setCourses,
  originalCourses,
}: {
  courses: CourseItemInterface[];
  setCourses: (item: CourseItemInterface[]) => void;
  originalCourses: CourseItemInterface[];
}) => {
  const [open, setOpen] = useState(false);
  const [pointer, setPointer] = useState<number>(3);

  function sortByAllCourses(e: any) {
    setCourses([...originalCourses]);
    setPointer(0);
  }

  function sortByCheapPrice(e: any) {
    let filtered = [...originalCourses];
    filtered = filtered.sort((a, b) => a.price - b.price);
    setCourses(filtered);
    setPointer(1);
  }

  function sortByExpensivePrice(e: any) {
    let filtered = [...originalCourses];
    filtered = filtered.sort((a, b) => a.price + b.price);
    setCourses(filtered);
    setPointer(2);
  }

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
                <span
                  style={{ cursor: "pointer" }}
                  onClick={sortByAllCourses}
                  className="d-flex justify-content-between border-bottom p-4"
                >
                  <span className="opacity-75">همه دوره ها</span>
                  {pointer === 0 ? (
                    <i
                      style={{
                        width: "19px",
                        height: "19px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-check text-success border border-success p-2 d-flex justify-content-center align-items-center rounded-circle"
                    ></i>
                  ) : null}
                </span>
                {/*  */}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={sortByCheapPrice}
                  className="d-flex justify-content-between border-bottom p-4"
                >
                  <span className="opacity-75">ارزان ترین</span>

                  {pointer === 1 ? (
                    <i
                      style={{
                        width: "19px",
                        height: "19px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-check text-success border border-success p-2 d-flex justify-content-center align-items-center rounded-circle"
                    ></i>
                  ) : null}
                </span>
                {/*  */}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={sortByExpensivePrice}
                  className="d-flex justify-content-between border-bottom p-4"
                >
                  <span className="opacity-75">گران ترین</span>

                  {pointer === 2 ? (
                    <i
                      style={{
                        width: "19px",
                        height: "19px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-check text-success border border-success p-2 d-flex justify-content-center align-items-center rounded-circle"
                    ></i>
                  ) : null}
                </span>
                {/*  */}
                <span className="d-flex justify-content-between border-bottom p-4">
                  <span className="opacity-75">///</span>

                  {pointer === 3 ? (
                    <i
                      style={{
                        width: "19px",
                        height: "19px",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-check text-success border border-success p-2 d-flex justify-content-center align-items-center rounded-circle"
                    ></i>
                  ) : null}
                </span>
                {/*  */}
              </div>
            </div>
          </div>
          <OverlayComponent open={open} setOpen={setOpen} classname="active" />
        </>
      )}
    </>
  );
};

export default CourseCategories;
