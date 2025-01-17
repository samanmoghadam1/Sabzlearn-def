"use client";

import AllCourses from "@/app/components/courses/AllCourse";
import customServerFetch from "@/app/utils/custom_fetch_server";
import { Suspense, useEffect, useState } from "react";
import { CourseItemInterface } from "../../page";

const CourseFilter = ({ params }: { params: Promise<{ search: string }> }) => {
  const [response, setResponse] = useState<CourseItemInterface[]>();
  useEffect(() => {
    async function fetchData() {
      const search = (await params).search;
      const response: CourseItemInterface[] = await customServerFetch(
        `http://127.0.0.1:8000/courses/search/${search}`,
        "GET",
        undefined
      );
      setResponse(response);
    }
    fetchData();
  }, []);
  // http://127.0.0.1:8000/courses/search/html

  return response && response.length != 0 ? (
    <Suspense fallback={<h1>loading ...</h1>}>
      <AllCourses arr={response} />
    </Suspense>
  ) : (
    <Suspense fallback={<h1>loading ...</h1>}>
      <h1>get the hell out of here</h1>
    </Suspense>
  );
};

export default CourseFilter;
