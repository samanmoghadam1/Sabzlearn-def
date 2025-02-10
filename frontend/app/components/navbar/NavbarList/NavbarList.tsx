"use client";

import { useEffect, useState } from "react";
import "./NavbarList.css";
import { fetchNavbarCategories } from "@/app/utils/fetchData";
import Category from "./Category";
import { useRouter } from "next/navigation";

interface NavbarProps {
  navbarListState: boolean;
  setNavbarListState: (item: boolean) => void;
}

const NavbarList = ({ navbarListState, setNavbarListState }: NavbarProps) => {
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  const router = useRouter();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/courses/search/${inputValue}`);
    setNavbarListState(false); 
  }

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data: any = await fetchNavbarCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getCategories();
  }, []);

  return (
    <>
      <div
        className={
          navbarListState
            ? "navbar-list z-3 p-3"
            : "z-3 p-3 navbar-list-display-none"
        }
      >
        {/* Navbar content */}
        <div className="border-bottom top-of-navbar-list d-flex justify-content-between">
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
          <div className="d-flex gap-1">
            <button className="navbar-list-icons border-0">
              <i className=" fa-regular fa-moon "></i>
            </button>
            <button
              onClick={() => setNavbarListState(false)}
              className="navbar-list-icons border-0"
            >
              <i className=" fa-solid fa-xmark "></i>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="چیو میخوای یاد بگیری ؟‌"
            type="text"
            className="input-navbar-list p-3 mt-5"
          />
          <button className="button-navbar-list p-3">
            {" "}
            <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Categories */}
        <div className="navbar-list-categories m-0">
          <ol className="mt-5 w-100 p-0">
            {categories.map((item, index) => (
              <Category item={item} index={index} key={index} />
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default NavbarList;
