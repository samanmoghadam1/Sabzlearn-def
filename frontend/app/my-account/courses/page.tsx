"use client";

import ProfileTitleComponent from "@/app/components/profileTitle/ProfileTitleComponent";
import customFetch from "@/app/utils/custom_fetch";
import { short_text, toPersianNumber } from "@/app/utils/functions";
import Link from "next/link";
import { useEffect, useState } from "react";

// http://127.0.0.1:8000/orders/purchased_courses/list/

interface courseInterface {
  courses: {id: number; name: string; point: number; image: string; teacher: {name:string, id: number} };
}
const accoutCourses = () => {
  const [courses, setCourses] = useState<courseInterface[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response: [] = await customFetch(
        "http://127.0.0.1:8000/orders/purchased_courses/list/",
        "GET",
        undefined,
        { cache: "no-store" }
      );
      console.log(response);
      setCourses(response);
    }
    fetchData();
  }, []);
  return (
    <div>
      <ProfileTitleComponent className="mx-3" title="دوره های من" />
      <div className="row  gap-1 d-flex justify-content-center">
        {courses.map(
          (
            course: courseInterface,
            index
          ) => {
            return (
              <div
                key={index}
                className="col-5 p-0 mx-2 my-3 bg-white rounded-2 "
              >
                <div
                  className="position-relative"
                  style={{ width: "100%", height: "125px" }}
                >
                  <Link href={`/courses/${course.courses.id}`}>
                    <img
                      src={`http://127.0.0.1:8000/${course.courses.image}`}
                      alt="course image"
                      style={{
                        width: "100%",
                        height: "125px",
                        margin: "0px",
                        padding: "0px",
                      }}
                      className="rounded-1 "
                    />
                  </Link>
                  <Link href={`/courses/${course.courses.id}`}>
                    <i
                      style={{
                        top: "35%",
                        left: "40%",
                        width: "50px",
                        height: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "50%",
                        cursor: "pointer",
                        fontSize: "30px",
                      }}
                      className="fas fa-play position-absolute bg-white"
                    ></i>
                  </Link>
                </div>

                <div className="p-2 mt-3 border-bottom">
                  <Link href={`/courses/${course.courses.id}`}>
                  <h6
                    style={{
                      lineHeight: "25px",
                      fontWeight: "lighter",
                      cursor: "pointer",
                    }}
                    className="  "
                  >
                    {short_text(course.courses.name, 25)}
                  </h6>
                  </Link>

                  <div className="d-flex justify-content-between mt-4">
                    <span
                      className="d-flex gap-2 text-secondary"
                    >
                      <i className="far fa-user"></i>
                      <span style={{ fontSize: "14px" }}>
                        {course.courses.teacher.name}
                      </span>
                    </span>
                    <span className=" text-warning">
                      <span>
                        {toPersianNumber(`${course.courses.point}.0`)}
                      </span>
                      <i className="fas fa-star "></i>
                    </span>
                  </div>
                </div>

                <div className="d-flex justify-content-between py-3 p-2">
                  <span
                    style={{
                      fontSize: "14px",
                      color: "var(--sabzlearn-color)",
                    }}
                    className=""
                  >
                    {toPersianNumber(0)}٪ مشاهده دوره
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default accoutCourses;
