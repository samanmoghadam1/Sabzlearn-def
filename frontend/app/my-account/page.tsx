// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";


import Course from "../components/courses/Courses";
import OpenBookIcon from "../components/icons/openBookIcon";
import QandAIcon from "../components/icons/QandAIcon";
import TicketIcon from "../components/icons/ticketsIcon";
import WalletIcon from "../components/icons/walletIcon";
import ProfileTitleComponent from "../components/profileTitle/ProfileTitleComponent";

const MyAccountPage = () => {
  return (
    <div className="m-3">
      <div className="bg-white my-4  p-3 px-4 rounded-1">
        <div className="d-flex gap-4 align-items-center mt-4">
          <OpenBookIcon style={{width: "40px"}}/>
          <div className="d-flex flex-column gap-2 ">
            <span style={{ fontSize: "13px" }} className="opacity-75">
              دوره های درحال یادگیری
            </span>
            <span className="fw-bold">۵ دوره</span>
          </div>
        </div>

        <div className="d-flex gap-4 align-items-center mt-4">
          <TicketIcon />
          <div className="d-flex flex-column gap-2 ">
            <span style={{ fontSize: "13px" }} className="opacity-75">
              مجموع تیکت های من
            </span>
            <span className="fw-bold">۰ تیکت</span>
          </div>
        </div>

        <div className="d-flex gap-4 align-items-center mt-4">
          <QandAIcon />
          <div className="d-flex flex-column gap-2 ">
            <span style={{ fontSize: "13px" }} className="opacity-75">
              پرسش پاسخ های من
            </span>
            <span className="fw-bold">۰ پرسش</span>
          </div>
        </div>

        <div className="d-flex gap-4 align-items-center mt-4">
          <WalletIcon />
          <div className="d-flex flex-column gap-2 ">
            <span style={{ fontSize: "13px" }} className="opacity-75">
              موجودی کیف پول
            </span>
            <span className="fw-bold">۰ تومن</span>
          </div>
        </div>
      </div>

      <ProfileTitleComponent link="courses/" title="در حال یادگیری" />

      {/* <Swiper spaceBetween={10} slidesPerView={1}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper> */}

      <Course
        description="عالی"
        id={1}
        image="https://sabzlearn.ir/wp-content/uploads/2023/11/Course-thumbnail-Algorithm-1-768x432.webp"
        offer={10}
        point={3.2}
        price={100000}
        studentsNumber={56}
        teacher=" سامان مقدم"
        title="الگریتم به زبان ساده"
        user_id={2}
        key={1}
      />
      <ProfileTitleComponent link="courses/" title="پرسش های اخیر" />
      <span className="text-center d-block">هیچ پرسشی برای شما وجود ندارد</span>
      <ProfileTitleComponent link="courses/" title="تیکت های اخیر" />
      <span className="text-center d-block">هیج تیکتی برای شما وجود ندارد</span>
    </div>
  );
};

export default MyAccountPage;
