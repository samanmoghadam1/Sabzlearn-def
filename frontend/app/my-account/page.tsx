import Course from "../components/courses/Courses";
import OpenBookIcon from "../components/icons/openBookIcon";
import QandAIcon from "../components/icons/QandAIcon";
import TicketIcon from "../components/icons/ticketsIcon";
import WalletIcon from "../components/icons/walletIcon";
import ProfileTitleComponent from "../components/profileTitle/ProfileTitleComponent";
import UserPanel from "../components/my-account/panel";
import customServerFetch from "../utils/custom_fetch_server";
import Slider from "../components/swipper/swipperComponent";
import { CourseItemInterface } from "../courses/page";

const MyAccountPage = async () => {
  const courses: any = await customServerFetch(
    "http://127.0.0.1:8000/orders/purchased_courses/list/",
    "GET",
    undefined
  );
  console.log(courses); 
  return (
    <div className="row m-3">
      <UserPanel />
      <div className="col-sm-12 col-md-8 col-lg-9 col-xl-10">
        <div className="bg-white row my-4 p-3 px-4 rounded-1">
          <div className="d-flex gap-4 col-12 col-md-6 mt-md-4 col-lg-4  align-items-center mt-4">
            <OpenBookIcon style={{ width: "40px" }} />
            <div className="d-flex flex-column gap-2 ">
              <span style={{ fontSize: "13px" }} className="opacity-75">
                دوره های درحال یادگیری
              </span>
              <span className="fw-bold">۵ دوره</span>
            </div>
          </div>

          <div className="d-flex gap-4 col-12 col-md-6 mt-md-4 col-lg-4 align-items-center mt-4">
            <TicketIcon />
            <div className="d-flex flex-column gap-2 ">
              <span style={{ fontSize: "13px" }} className="opacity-75">
                مجموع تیکت های من
              </span>
              <span className="fw-bold">۰ تیکت</span>
            </div>
          </div>

          <div className="d-flex gap-4 col-12 col-md-6 mt-md-4 col-lg-4 align-items-center mt-4">
            <QandAIcon />
            <div className="d-flex flex-column gap-2 ">
              <span style={{ fontSize: "13px" }} className="opacity-75">
                پرسش پاسخ های من
              </span>
              <span className="fw-bold">۰ پرسش</span>
            </div>
          </div>

          <div className="d-flex gap-4 col-12 col-md-6 mt-md-4 col-lg-4 align-items-center mt-4">
            <WalletIcon />
            <div className="d-flex flex-column gap-2 ">
              <span style={{ fontSize: "13px" }} className="opacity-75">
                موجودی کیف پول
              </span>
              <span className="fw-bold">۰ تومن</span>
            </div>
          </div>
        </div>

        <ProfileTitleComponent
          link="/my-account/courses"
          title="در حال یادگیری"
        />

        <div className="row">
        {courses.map((item: any, index:number) => {
          return (
            <Course
              description={item.courses.description}
              id={1}
              image={`http://127.0.0.1:8000/${item.courses.image}`}
              offer={10}
              point={3.2}
              price={item.courses.price}
              studentsNumber={item.courses.number_of_sessions}
              teacher={item.courses.teacher.name}
              title={item.courses.name}
              user_id={2}
              key={index}
            />
          );
        })}
        </div>

        <ProfileTitleComponent link="courses/" title="پرسش های اخیر" />
        <span className="text-center d-block">
          هیچ پرسشی برای شما وجود ندارد
        </span>
        <ProfileTitleComponent link="courses/" title="تیکت های اخیر" />
        <span className="text-center d-block">
          هیج تیکتی برای شما وجود ندارد
        </span>

        
      </div>
    </div>
  );
};

export default MyAccountPage;
