"use client";

import Image from "next/image";
import HamburgerButton from "../navbar/Hamburger-button/HamburgerButton";
import BasketNavbar from "../navbar/Navbarfeature/basket/Basket";

import "./NavbarAndSearch.css";
import ProfileNavbar from "../navbar/Navbarfeature/profile/Profile";
import Link from "next/link";
import { fetchUserData } from "@/app/utils/fetchData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// responsive sisez:  644px,  770, 1027px, 1289
const NavbarAndSearch = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [user, setUser] = useState({});

  const router = useRouter(); 

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchUserData();
      setUser(data);
    };
    fetchUser();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/courses/search/${inputValue}`)
  }


  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  
  return (
    <div className="bg-secondary pb-4 pt-2 px-4 navbar-and-search-container">
      <div className="navbar-and-search-layout-container">
        <div className="d-flex justify-content-between align-items-center">
          <HamburgerButton
            textsStyle={{ color: "white" }}
            className="d-md-none"
            barBtnStyle={{
              backgroundColor: "transparent",
              color: "white",
              fontSize: "19px",
            }}
          />
          <svg
            width={70}
            className="d-md-none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 20 1020 750"
          >
            <polygon
              fill="#006537"
              points="484.34,567.41 300.6,663.13 236.63,624.86 236.69,469.22"
            ></polygon>
            <polygon
              fill="#1EB35B"
              points="817.97,393.27 817.92,534.3 477.61,768.96 300.6,663.13"
            ></polygon>
            <polygon
              fill="#006869"
              points="974.76,213.51 484.22,469.62 7.91,280.8 498.52,24.73"
            ></polygon>
            <line
              fill="#1A3D3D"
              x1="931.68"
              y1="313.64"
              x2="931.59"
              y2="313.82"
            ></line>
            <polygon
              fill="#006869"
              points="1012.54,583.89 953.38,640.76 898.07,579.95 936.04,543.43 936.06,233.71 974.75,213.5 974.46,542.02"
            ></polygon>
            <polygon
              fill="#004842"
              points="974.76,213.51 974.66,315.72 936.05,335.88 936.06,233.72"
            ></polygon>
          </svg>
          <div className="d-flex align-items-center gap-2">
            <BasketNavbar btnStyle={{ backgroundColor: "transparent" }} />
            <div className="d-none signup-or-profile-home-page">
              {!user ? (
                <Link
                  href={`/login`}
                  className="
                sign-up-in-home-btn
                border-0
                d-flex gap-2 justify-content-center
                align-items-center
                rounded-2 d-none
            "
                  style={{
                    fontSize: "15px",
                    backgroundColor: "var(--sabzlearn-color)",
                    color: "white",
                    width: "150px",
                    height: "45px",
                  }}
                >
                  <i className="fa-regular fa-user icon"></i>
                  <span>ورود|عضویت</span>
                </Link>
              ) : (
                <ProfileNavbar
                  iconColor={{ color: "white" }}
                  containerStyle={{ backgroundColor: "transparent" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className=" home-page-title d-flex flex-column text-center justify-content-center text-white mt-5">
          <h5 className="fw-bold ">آکادمی آموزش برنامه نویسی سبزلرن</h5>
          <p style={{ fontSize: "12px" }} className=" m-auto mt-2 w-75">
            با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و
            پیشرفت کن
          </p>
        </div>

        <form
          className="mt-4 d-flex justify-content-center p-2 search-form-input-home-page"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleChangeInput}
            value={inputValue}
            style={{
              width: "400px",
              height: "70px",
              outline: "none",
              fontSize: "14px",
            }}
            type="text"
            className="border-0 p-2 rounded-end-5 home-search-input"
            placeholder="جستجو در بین دوره ها ..."
          />
          <div
            style={{ width: "10%", height: "70px" }}
            className="
          bg-white py-2 
          d-flex justify-content-center 
          align-items-center 
          rounded-start-5  position-relative"
          >
            <button
              className="
            border-0 text-white
            p-4 rounded-circle
            d-flex justify-content-center 
            align-items-center  position-absolute"
              style={{
                backgroundColor: "var(--sabzlearn-color)",
                width: "40px",
                height: "40px",
                marginLeft: "14px",
                left: "0px",
              }}
            >
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ fontSize: "20px", color: "rgba(255 255 255 0.8)" }}
              ></i>
            </button>
          </div>
        </form>
        <div className="d-flex  justify-content-between mt-4 px-5 all-fetcure-home-items">
          <div className="d-flex flex-column text-white text-center align-items-center">
            <Image
              src={
                "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/clock-min.webp"
              }
              alt="click icon"
              width={40}
              height={40}
            />
            <span className="mt-3 fw-bold">1455</span>
            <span style={{ fontSize: "12px" }} className="fw-bold">
              ساعت آموزش
            </span>
          </div>
          <div className="d-flex flex-column text-white text-center align-items-center">
            <Image
              src={
                "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/book-min.webp"
              }
              alt="click icon"
              width={40}
              height={40}
            />
            <span className="mt-3 fw-bold">77</span>
            <span className="fw-bold" style={{ fontSize: "12px" }}>
              دوره آموزشی
            </span>
          </div>
          <div className="d-flex flex-column text-white text-center align-items-center">
            <Image
              src={
                "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/conversation-min.webp"
              }
              alt="click icon"
              width={40}
              height={40}
            />
            <span className="mt-4 fw-bold">168857</span>
            <span className="fw-bold" style={{ fontSize: "12px" }}>
              دانشجو
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarAndSearch;
