import Image from "next/image";
import OpenBookIcon from "../icons/openBookIcon";
import TicketIcon from "../icons/ticketsIcon";
import HamburgerButton from "../navbar/Hamburger-button/HamburgerButton";
import BasketNavbar from "../navbar/Navbarfeature/basket/Basket";
import "./NavbarAndSearch.css";

const NavbarAndSearch = () => {
  return (
    <div className="bg-secondary pb-4 pt-2 px-4 navbar-and-search-container">
      <div className="d-flex justify-content-between align-items-center">
        <HamburgerButton
          barBtnStyle={{
            backgroundColor: "transparent",
            color: "white",
            fontSize: "19px",
          }}
        />
        <svg
          width={70}
          className=""
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
        <BasketNavbar btnStyle={{ backgroundColor: "transparent" }} />
      </div>

      <div className="d-flex flex-column text-center justify-content-center text-white mt-5">
        <h5 className="fw-bold">آکادمی آموزش برنامه نویسی سبزلرن</h5>
        <p style={{ fontSize: "12px" }} className="w-75 m-auto mt-2">
          با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و
          پیشرفت کن
        </p>
      </div>

      <form className="mt-4 d-flex justify-content-center p-2">
        <input
          style={{ width: "400px", outline: "none", fontSize: "14px" }}
          type="text"
          className="border-0 p-2 rounded-end-5"
          placeholder="جستجو در بین دوره ها ..."
        />
        <div
          style={{ width: "10%", height: "100%" }}
          className="bg-white py-2 d-flex justify-content-center align-items-center rounded-start-5 "
        >
          <button
            className="border-0 text-white p-4 rounded-circle d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "var(--sabzlearn-color)",
              width: "40px",
              height: "40px",
              marginLeft: "14px",
            }}
          >
            <i
              className="fa-solid fa-magnifying-glass"
              style={{ fontSize: "20px", color: "rgba(255 255 255 0.8)" }}
            ></i>
          </button>
        </div>
      </form>
      <div  className="d-flex  justify-content-between mt-4 px-5 ">
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
          <span className="fw-bold" style={{ fontSize: "12px" }}>دوره آموزشی</span>
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
  );
};

export default NavbarAndSearch;
