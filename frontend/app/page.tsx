import Course from "./components/courses/Courses";
import SecurityIcon from "./components/icons/securityIcon";
import FrontEndIcon from "./components/icons/frontendIcon";
import PythonIcon from "./components/icons/pythonIcon";
import SoftskillIcon from "./components/icons/softskillIcon";
import Link from "next/link";
import ArrowLeftIcon from "./components/icons/arrowLeftIcon";
import NavbarAndSearch from "./components/homePagecomponetns/NavbarAndSearch";

interface CourseItemInterface {
  category: number;
  created_at: string;
  description: string;
  discount: number;
  free: boolean;
  id: number;
  image: string;
  name: string;
  number_of_sessions: number;
  price: string;
  teacher: string;
  user_data: {
    name: string;
    email: string;
    id: number;
  };
}

const HomePage = async () => {
  let courses: [] = [];
  try {
    const res = await fetch("http://127.0.0.1:8000/courses/", {
      cache: "no-store",
    });
    courses = await res.json();
  } catch (error) {
    console.log(error);
  }
  

  return (
    <>
      <NavbarAndSearch />

      <div
        style={{ marginTop: "90px" }}
        className="last-courses container  mb-5"
      >
        <h2 className="fw-bold fw-bold text-center">آخرین دوره های سبزلرن</h2>
        <p className="opacity-75 text-center">سکوی پرتاب شما به سمت موفقیت</p>
        <Link className="text-success d-block text-center" href="/courses">
              مشاهده همه دوره ها
              <ArrowLeftIcon width="20px" />
            </Link>

        <div className="row ">
          {courses.map((item: CourseItemInterface, index: number) => {
            return (
              <div key={index}>
                <Course
                  key={index}
                  teacher={item.user_data.name}
                  point={4.2}
                  title={item.name}
                  description={item.description}
                  offer={item.discount}
                  image={item.image}
                  price={120000}
                  studentsNumber={1000}
                  id={item.id}
                  user_id={item.user_data.id}
                />
              </div>
            );
          })}
        </div>

        <div className="popular-course text-center mt-5 ">
          <h2 className="fw-bold">نقشه راه ها </h2>
          <p className="opacity-50">نقشه های راه برای شروع اصولی یادگیری</p>

          <div id="road-maps" className="road-maps row ">
            <div
              className="mt-4 col-5 p-3 rounded-4 m-auto text-white"
              style={{ background: "linear-gradient(97deg, #30C5E4, #28E55D)" }}
            >
              <SecurityIcon />
              <h5 className="mt-3 fw-bold">امنیت</h5>
              <span className="mt-3">9 دوره </span>
            </div>

            <div
              className="mt-4 col-5 p-3 rounded-4 m-auto text-white"
              style={{
                background: "linear-gradient(97deg, #FFB535, #F2295B)",
              }}
            >
              <FrontEndIcon />
              <h5 className="mt-3 fw-bold">فرانت اند</h5>
              <span className="mt-3">9 دوره </span>
            </div>

            <div
              className="mt-4 col-5 p-3 rounded-4 m-auto text-white"
              style={{
                background: "linear-gradient(97deg, #2E9EFF, #9C33F7)",
              }}
            >
              <PythonIcon />
              <h5 className="mt-3 fw-bold">پایتون</h5>
              <span className="mt-3">9 دوره </span>
            </div>

            <div
              className="mt-4 col-5 p-3 rounded-4 m-auto text-white"
              style={{
                background: "linear-gradient(97deg, #880175, #ff3571)",
              }}
            >
              <SoftskillIcon />
              <h5 className="mt-3 fw-bold">مهارت های نرم </h5>
              <span className="mt-3">9 دوره </span>
            </div>
          </div>

          <div className="populares-course mt-5 ">
            <h3 className="fw-bold">محبوب ترین دوره ها</h3>
            <p className="opacity-75">پر مخاطب ترین دوره های رایگان</p>
            <Link className="text-success" href="/courses">
              مشاهده همه دوره ها
              <ArrowLeftIcon width="20px" />
            </Link>

            {courses.map((item: CourseItemInterface, index: number) => {
              return (
                <>
                  <Course
                    key={index}
                    teacher={item.user_data.name}
                    point={4.2}
                    title={item.name}
                    description={item.description}
                    offer={item.discount}
                    image={item.image}
                    price={120000}
                    studentsNumber={1000}
                    id={item.id}
                    user_id={item.user_data.id}
                  />
                </>
              );
            })}
          </div>

          {/* end of popular-course */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
