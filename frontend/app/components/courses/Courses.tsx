import Link from "next/link";
import "./course.css";

import { short_text, toPersianNumber } from "@/app/utils/functions";

interface CourseProps {
  offer: null | number;
  image: string;
  title: string;
  description: string;
  point: number;
  teacher: string;
  studentsNumber: number;
  price: number;
  id: number;
  user_id: number;
}

const Course = ({
  offer,
  image,
  title,
  description,
  point,
  teacher,
  price,
  studentsNumber,
  id,
  user_id,
}: CourseProps) => {
  return (
    <div
      dir="rtl"
      className="col-xl-3 rounded-3 p-3 col-lg-4 col-md-6 col-sm-6 col-12 d-flex flex-column p-0 "
    >
      <div className="bg-white rounded-3 ">
        <div>
          <Link href={`courses/${id}`}>
            <img
              style={{ width: "100%", height: "160px" }}
              src={image}
              className="rounded-4"
              alt={`course image ${title}`}
            />
          </Link>
          <div className="p-3">
            <Link href={`courses/${id}`}>
              <h6 className="mt-2 course-title">{title}</h6>
            </Link>
            <p className="mt-4 course-description">
              {short_text(description, 76)}
            </p>
            <div className="d-flex course-teacher  flex-row justify-content-between align-items-center border-bottom pb-3">
              <div className="d-flex gap-1 align-items-center">
                <i className="fa-solid fa-user"></i>
                <Link href={`/profile/${user_id}`}>
                  <span>{teacher}</span>
                </Link>
              </div>

              <div className="text-warning d-flex gap-1 align-items-center">
                <span>{toPersianNumber(5.0)}</span>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <div className="d-flex gap-2 align-items-center course-student-number">
                <i className="fa-solid fa-users"></i>
                <span>{studentsNumber}</span>
              </div>
              <div
                className="d-flex gap-2 align-items-center "
                style={{ color: "var(--sabzlearn-color)" }}
              >
                <span>
                  {" "}
                  <span className="course-price">
                    {" "}
                    {toPersianNumber(price)}{" "}
                  </span>{" "}
                  تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
