import Link from "next/link";
import "./course.css";

import Image from "next/image";
import { short_text } from "@/app/utils/functions";

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
  user_id: number
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
  user_id
}: CourseProps) => {
  return (
    <div dir="rtl" className="col-11 rounded-3 rounded-4 bg-white course mt-4">
      <div className="course-image-container position-relative">
        <Link href={`courses/${id}`}>
          <Image
            src={image}
            alt={`Course Image of ${teacher}`}
            width={0}
            height={0}
            unoptimized
            quality={100}
            className="rounded-4 z-0"
            style={{
              width: "100%",
              height: "200px",
              backgroundColor: "rgb(229, 231, 235)",
              objectFit: "cover",
            }}
          />
        </Link>

        {offer ? (
          <span
            style={{
              right: 20,
              top: 30,
              backgroundColor: "rgb(34 197 94)",
              width: "3.5rem",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
            }}
            className="position-absolute couse-offer p-2 rounded-5 text-white"
          >
            {offer}%
          </span>
        ) : null}
      </div>

      <div className="course-text">
        <Link href={`courses/${id}`}>
          <span className="h6 text-decoration-none course-title">{title}</span>
        </Link>
        <p className="mt-3 opacity-50 course-description">{short_text(description, 80)}</p>

        <div className="d-flex border-bottom justify-content-between pb-3">
          <span className="opacity-50">
            <i className="fa-regular fa-user"></i>
            <Link href={`/profile/${user_id}`}> {teacher}</Link>
          </span>
          <span className="text-warning">
            {point}
            <i className="fa-solid fa-star"></i>
          </span>
        </div>
      </div>

      <div className="course-price-information d-flex justify-content-between">
        <span>
          <i className="fa-solid fa-users"></i>
          {` ${studentsNumber}`}
        </span>
        <span className="text-success">{price}تومان</span>
      </div>
    </div>
  );
};

export default Course;
