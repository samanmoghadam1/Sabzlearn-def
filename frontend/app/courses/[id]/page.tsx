import Headline from "@/app/components/lesssonCorse/headLine";
import "./page.css";

import {
  fetchDetailCourse,
  fetchHeadLinesByCourse,
  fetchReviewsByCourse,
} from "@/app/utils/fetchData";
import Image from "next/image";
import Link from "next/link";
import Comment, {
  commentInterFace,
} from "@/app/components/commentComponent/Comment";
import AddToBasketButton from "./components/add_to_basket_btn";
import { fetchUserDataFromServer } from "@/app/utils/fetchDataServer";
import customServerFetch from "@/app/utils/custom_fetch_server";
import ReviewsComponent from "./components/reviews";

interface CourseItemInterface {
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
  user_data: {
    id: number;
    name: string;
    email: string;
    image: string;
  };
}

const CourseDetail = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const id = (await params).id;
  const data: CourseItemInterface = await fetchDetailCourse(id);
  const headlines = await fetchHeadLinesByCourse(id);
  const reviews = await fetchReviewsByCourse(id);
  const user = await fetchUserDataFromServer();

  // http://127.0.0.1:8000/reviews/create/${id}

  return (
    <div>
      <nav aria-label="breadcrumb-nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">
              <i className="fa-solid fa-house"></i> خانه
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/category/${data.category_data.id}`}>
              {data.category_data.name}
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {data.name}
          </li>
        </ol>
      </nav>

      <div className="bg-white p-3 m-3 rounded-4">
        <div className="tumbnail-image-course text-center">
          <Image
            src={data.image}
            alt="the tumbnail of course"
            width={100}
            height={100}
            className="rounded-4"
            style={{ width: "95%", height: "95%" }}
            unoptimized
          />
        </div>
        <div className="course-detail-texts mt-4">
          <h4>{data.name}</h4>
          <p className="mt-3">{data.description}</p>
          <span className="d-block text-center h4 mt-4">
            {" "}
            {data.price} <span className="h5">تومان</span>
          </span>
          <AddToBasketButton id={id} />
        </div>
      </div>

      <div className="row p-3 d-flex justify-content-around">
        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-solid fa-circle-exclamation h1"
          ></i>
          <span className="d-block h6">وضعیت دوره</span>
          <span className="opacity-50 h6">به اتمام رسیده</span>
        </div>

        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-regular fa-clock h1"
          ></i>
          <span className="d-block h6">تعداد جلسات</span>
          <span className="opacity-50 h6">{data.number_of_sessions}</span>
        </div>

        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-regular fa-calendar h1"
          ></i>
          <span className="d-block h6">آخرین بروزرسانی</span>
          <span className="opacity-50 h6">1403/9/25</span>
        </div>

        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-regular fa-user h1"
          ></i>
          <span className="d-block h6">روش پشتیبانی</span>
          <span className="opacity-50 h6">آنلاین</span>
        </div>

        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-solid fa-briefcase h1"
          ></i>
          <span className="d-block h6">پیش نیاز</span>
          <span className="opacity-50 h6">ندارد</span>
        </div>

        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-solid fa-video h1"
          ></i>
          <span className="d-block h6">نوع مشاهده</span>
          <span className="opacity-50 h6">به صورت آنلاین</span>
        </div>
      </div>

      <div className="headlines p-3 m-4 bg-white rounded-4">
        <h4>سرفصل ها</h4>
        <div className="headline-items mt-4">
          {headlines.detail.map(
            (item: { title: string; id: number }, index: number) => {
              return (
                <div className="mt-3" key={index}>
                  <Headline item={item} />
                </div>
              );
            }
          )}
        </div>
      </div>
      <div className="course-comments p-3 m-4 bg-white rounded-4">
        <div>
          <ReviewsComponent courseId={id} user={user} reviews={reviews} />
        </div>
      </div>

      <div className="d-flex justify-content-center gap-4 bg-white p-4 m-3 my-5 rounded-4">
        <div
          style={{ backgroundColor: "rgb(243 244 246)" }}
          className="d-flex align-items-center text-center flex-column justify-content-center px-4 p-2 rounded-4 w-50"
        >
          <i
            style={{ fontSize: "35px", color: "rgb(34 197 94)" }}
            className="fa-solid fa-users mt-2"
          ></i>
          <h6 className="fw-bold mt-3">1785</h6>
          <p className="opacity-50">دانشجو</p>
        </div>
        <div
          style={{ backgroundColor: "rgb(243 244 246)" }}
          className="d-flex align-items-center text-center flex-column justify-content-center p-2 px-4 rounded-4 w-50"
        >
          <i
            style={{ fontSize: "35px", color: "rgb(245 158 11)" }}
            className="fa-solid fa-star mt-2"
          ></i>
          <h6 className="fw-bold mt-3">5.0</h6>
          <p className="opacity-50">امتیاز</p>
        </div>
      </div>
      <div className="teacher-of-course mt-2 text-center  gap-2 bg-white my-5 p-3 py-4 rounded-4 mx-3">
        {/*  */}
        <Image
          src={
            // data.user_data.image ||
            // "http://localhost:3000/static-images/default-avatar.png"
            data.user_data.image
              ? `http://127.0.0.1:8000/${data.user_data.image}`
              : "http://localhost:3000/static-images/default-avatar.png"
          }
          width={90}
          height={90}
          alt="teacher profile"
          className="rounded-circle"
        />
        <h4 className="mt-3 mb-5">{data.user_data.name} | مدرس دوره</h4>
        <Link
          className="look-my-profile-courses"
          role="button"
          href={`/profile/${data.user_data.id}`}
        >
          مشاهده پروفایل من{" "}
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;

// http://127.0.0.1:8000/reviews/2
