import Button from "@/app/components/elemets/Button";
import VideoPlayer from "@/app/components/videoPlayer/VideoPlayer";
import {
  fecthLessonById,
  fetchDetailCourse,
  fetchHeadLinesByCourse,
} from "@/app/utils/fetchData";

import Headline from "@/app/components/lesssonCorse/headLine";
import Image from "next/image";
import Link from "next/link";

export interface LessonInterface {}

const LessonPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id: number = (await params).id;
  const lesson = await fecthLessonById(id);
  const headlines = await fetchHeadLinesByCourse(lesson.course);
  const data = await fetchDetailCourse(lesson.course);

  return (
    <div style={{ padding: "30px 30px" }} className="">
      <VideoPlayer src={lesson.video} />
      <div className="mt-3 bg-white p-3 rounded-4 position-relative">
        <h3 className="mt-2 fw-bold">{lesson.course_data.title}</h3>
        <h6 className="mt-3 border-bottom pb-3">{lesson.title}</h6>
        <div
          className="position-absolute "
          style={{
            backgroundColor: "rgb(10 151 212)",
            width: "7px",
            height: "40px",
            right: "-7px",
            top: "20px",
            borderRadius: "0px 3px 3px 0px",
          }}
        ></div>
        <div className="mt-3">
          <button
            style={{ backgroundColor: "rgb(243 244 246)", fontSize: "14px" }}
            className="btn  d-block w-100 m-auto py-2"
          >
            سوال دارم !
          </button>
          <a download href={lesson.video}>
            <Button
              className="mt-2"
              style={{ fontSize: "14px" }}
              title="دانلود ویدیو"
              disable={false}
            />
          </a>
        </div>
      </div>
      <div className="headline-lesson mt-3 bg-white p-3 rounded-4 position-relative ">
        <h4 className="d-flex align-items-center gap-3">
          <i className="fa fa-file h1 text-secondary"></i> <span>سرفصل های دوره</span>
        </h4>
        <div
          className="position-absolute "
          style={{
            backgroundColor: "rgb(10 151 212)",
            width: "7px",
            height: "40px",
            right: "-7px",
            top: "14px",
            borderRadius: "0px 3px 3px 0px",
          }}
        ></div>

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

      <div className="row mt-3">
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
            className="fa-solid fa-video h1"
          ></i>
          <span className="d-block h6">نوع مشاهده</span>
          <span className="opacity-50 h6">به صورت آنلاین</span>
        </div>

        <div className="col-5 text-center bg-white m-3 p-4 rounded-4">
          <i
            style={{ color: "rgb(34 197 94)" }}
            className="fa-solid fa-briefcase h1"
          ></i>
          <span className="d-block h6">پیش نیاز</span>
          <span className="opacity-50 h6">ندارد</span>
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
        <Link href={`/profile/${data.user_data.id}`}><Button disable={false} title="مشاهده پروفایل من"/></Link>
      </div>
    </div>
  );
};

export default LessonPage;

// http://127.0.0.1:8000/lessons/lesson/1
