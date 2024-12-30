import { fetchCoursesByUser, fetchUserProfile } from "@/app/utils/fetchData";
import "./page.css";
import Image from "next/image";
import AllCourses from "@/app/components/courses/AllCourse";

const ProfilePage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;
  const courses = await fetchCoursesByUser(id); 
  const data = await fetchUserProfile(id);
  return (
    <div>
      <div className="user-profile bg-white m-4 mt-5 p-4 rounded-3 shadow">
        <div className="user-profile-informations text-center ">
          <Image
            src={
              data.image_url
                ? `http://127.0.0.1:8000/${data.image_url}`
                : "http://localhost:3000/static-images/default-avatar.png"
            }
            alt="user-image"
            width={112}
            height={112}
            className="rounded-circle "
          />
          <h6 className="mt-3 fw-bold">{data.name}</h6>
          <p
            style={{
              fontSize: "14px",
              opacity: "92%",
              lineHeight: "26px",
              textAlign: "center",
            }}
          >
            ۶ سال هست که برنامه نویسی رو شروع کردم؛ با فرانت استارت زدم و و حدود
            دو سال در زمینه برنامه نویسی فران ت و وردپرس فعالیت میکردم. بعد از
            اون رفتم سمت بکند و چهار سالی میشه که با PHP و NodeJS .کد میزنم تنها
            دلیلی که برنامه نویس شدم علاقه ای هست که به "ساختن" دارم:)
          </p>
          <div className="user-profile-informations-icons d-flex justify-content-center gap-3">
            <i className="fa-brands fa-github display-6 user-profile-informations-icon"></i>
            <i className="fa-brands fa-instagram display-6 user-profile-informations-icon"></i>
            <i className="fa-brands fa-telegram display-6 user-profile-informations-icon"></i>
          </div>
        </div>

        {data ? (
          <div dir="ltr" className="user-profile-skills mt-3">
            {data.skills.map((item: { name: string }, index: number) => {
              return (
                <input
                  style={{
                    backgroundColor: "rgb(236 237 237)",
                    fontSize: "20px",
                  }}
                  key={index}
                  type="text"
                  disabled
                  value={item.name}
                  className="input-group p-2 mt-3 rounded-3 border-0 opacity-75"
                />
              );
            })}
          </div>
        ) : null}
      </div>
      <AllCourses arr={courses}/>
    </div>
  );
};

export default ProfilePage;
