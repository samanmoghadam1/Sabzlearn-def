"use client";

import { useEffect, useState } from "react";
import { fetchCoursesByCategories } from "@/app/utils/fetchData";
import Link from "next/link";
import AlertComponent from "../../alert/alert";

const Category = ({
  item,
  index,
}: {
  item: { id: number; name: string };
  index: number;
}) => {
  const [courses, setCourses] = useState<Array<{ id: number; name: string }>>(
    []
  );
  const [openCategory, setOpenCategory] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({ error: "", success: "" });

  useEffect(() => {
    if (openCategory && courses.length === 0) {
      async function fetchCourses() {
        try {
          setLoading(true);
          const response: any = await fetchCoursesByCategories(item.id);
          setCourses(response.detail || []);
        } catch (error) {
          setAlert({ success: "", error: "خطا در اتصال یه سرور" });
        } finally {
          setLoading(false);
        }
      }
      fetchCourses();
    }
  }, [openCategory]);

  function returnAlertComponent() {
    if (alert.error !== "") {
      return <AlertComponent text={alert.error} backc="danger" />;
    } else if (alert.success !== "") {
      return <AlertComponent text={alert.success} backc="success" />;
    } else {
    }
  }

  return (
    <>
      {returnAlertComponent()}
      <div key={index}>
        <li
          className="d-flex justify-content-between align-items-center mt-4 w-100"
          style={
            openCategory
              ? { cursor: "pointer", color: "rgb(34 197 94)" }
              : { cursor: "pointer" }
          }
          onClick={() => setOpenCategory(!openCategory)}
        >
          <span>{item.name}</span>
          <span>
            <i
              className={`fa-solid ${
                openCategory ? "fa-chevron-down" : "fa-chevron-left"
              }`}
            ></i>
          </span>
        </li>

        {openCategory && (
          <ol
            className="mt-4 py-2 rounded-3 mx-2"
            style={{
              backgroundColor: "rgb(243 244 246)",
              listStyleType: "none",
            }}
          >
            {loading ? (
              <li style={{ opacity: "60%", textAlign: "center" }}>
                در حال بارگذاری...
              </li>
            ) : courses.length > 0 ? (
              courses.map((course, idx) => (
                <li className="mt-3" key={idx} style={{ opacity: "60%" }}>
                  <Link href={"/"}>{course.name}</Link>
                </li>
              ))
            ) : (
              <li
                style={{
                  opacity: "60%",
                  textAlign: "center",
                  fontSize: "13px",
                }}
              >
                دوره‌ای برای این دسته‌بندی وجود ندارد.
              </li>
            )}
          </ol>
        )}
      </div>
    </>
  );
};

export default Category;
