"use client";

import CourseCategories from "../components/features/courseFilters/CourseCategories";
import { fetchCourses } from "../utils/fetchData";
import "./style.css";
import CourseFilters from "@/app/components/features/courseFilters/CourseFilters";
import AllCourses from "../components/courses/AllCourse";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export interface CourseItemInterface {
  category_data: {
    description: string;
    id: number;
    name: string;
  };
  created_at: string;
  description: string;
  discount: number;
  free: boolean;
  id: number;
  image: string;
  name: string;
  number_of_sessions: number;
  price: number;
  teacher: string;
  point: number;
  offer: number;
  user_data: {
    name: string;
    email: string;
    id: number;
  };
}

const CoursesPage = () => {
  const [courses, setCourses] = useState<CourseItemInterface[]>([]);
  const [originalCourses, setOriginalCourses] = useState<CourseItemInterface[]>(
    []
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response: any = await fetchCourses();
      if (response) {
        setCourses(response);
        setOriginalCourses(response);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-2 pb-5 courses-container">
      <div className="text-center mt-4">
        <h3 className="fw-bold">جستجو:</h3>
        <span className="mt-5 opacity-75 number-of-course-courses">
          ۷۶ عنوان آموزشی
        </span>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            redirect(`/courses/search/${search}`);
          }}
          className="mt-5 search-course-courses-form w-100"
        >
          <input
            placeholder="جستجو بین دوره ها"
            className="p-4 border-0 btn-outline-none rounded-end-3 w-75"
            type="text"
            value={search}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              setSearch(e.currentTarget.value);
            }}
          />
          <button
            type="submit"
            className="p-4 btn-outline-none border-0 bg-white rounded-start-3"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <div className="d-flex justify-content-center gap-3 mt-3 px-4">
            <CourseFilters
              courses={courses}
              setCourses={setCourses}
              originalCourses={originalCourses}
            />
            <CourseCategories
              courses={courses}
              setCourses={setCourses}
              originalCourses={originalCourses}
            />
          </div>
        </form>

        <div className="courses-courses">
          <AllCourses arr={courses} />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
