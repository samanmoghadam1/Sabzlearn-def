"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./NavbarList.css";
import {
  fetchNavbarCategories,
} from "@/app/utils/fetchData";
import Category from "./Category";


interface NavbarProps {
  navbarListState: boolean;
  setNavbarListState: (item: boolean) => void;
}

const NavbarList = ({ navbarListState, setNavbarListState }: NavbarProps) => {
  const [categories, setCategories] = useState<
    Array<{ id: number; name: string }>
  >([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchNavbarCategories();
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
          <Image
            src={`https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp`}
            alt="sabz learn academy"
            width={73}
            height={60}
          /> 
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

        <form>
          <input placeholder="چیو میخوای یاد بگیری ؟‌" type="text" className="input-navbar-list p-3 mt-5"  />
          <button className="button-navbar-list p-3"> <i className="fas fa-search"></i>
          </button>
        </form>

        {/* Categories */}
        <div className="navbar-list-categories m-0">
          <ol className="mt-5 w-100 p-0">
            {categories.map((item, index) => (
              <Category item={item} index={index} key={index}/>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default NavbarList;
