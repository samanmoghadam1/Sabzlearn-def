"use client";

import { fetchUserData } from "@/app/utils/fetchData";
import "./Profile.css";

import OverlayComponent from "@/app/components/overlay/overlayComponent";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface userDataInterface {
  email: string;
  name: string;
  id: number;
  phone_number: number;
}

const ProfileNavbar = ({
  containerStyle,
  iconColor,
}: {
  containerStyle?: { backgroundColor?: string };
  iconColor?: { color?: string };
}) => {
  const [user, setUser] = useState<userDataInterface>();
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    async function fetchingUser() {
      const data: any = await fetchUserData();
      setUser(data);
    }
    const accessToken = localStorage.getItem("accessToken");
    setToken(accessToken);
    fetchingUser();
  }, []);

  const router = useRouter();
  return (
    <div className={open ? "position-relative" : "d-none d-md-block"}>
      {token ? (
        <button
          style={containerStyle}
          onClick={() => setOpen(!open)}
          className={`navbar-list-icons border-0 basket-icon-navbar ${
            open ? "position-relative" : ""
          }`}
        >
          <i style={iconColor} className="fa-regular  fa-user"></i>
        </button>
      ) : (
        <button
          style={containerStyle}
          onClick={() => router.push("login")}
          className={`navbar-list-icons border-0 basket-icon-navbar`}
        >
          <i className="fa-solid fa-right-to-bracket"></i>
        </button>
      )}

      {open ? (
        <>
          <div
            className="position-absolute bg-white mt-3 rounded-3 p-3 Basket-open "
            style={{ left: "20px", minWidth: "300px" }}
          >
            <div
              className="d-flex p-3"
              style={{ borderBottom: "1px solid rgb(225 221 221)" }}
            >
              <Image
                src="/static-images/default-avatar.png"
                className="rounded-circle ms-3"
                alt="User Avatar"
                width={70}
                height={70}
              />
              <div>
                <h6 className="mb-4">{user?.name}</h6>
                <span className="text-success">موجودی:‌ 0 تومن</span>
              </div>
            </div>

            <ol>
              <Link href={"/my-account"}>
                <li
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <i className="fa-solid fa-house"></i>

                  <span>پیشخوان</span>
                </li>
              </Link>
              {/*  */}
              <Link href={`/my-account/courses`}>
                <li onClick={() => setOpen(false)}>
                  <i className="fa-regular fa-folder"></i>

                  <span>دوره های من</span>
                </li>
              </Link>
              {/*  */}
              <Link href="/my-account/tickets">
                <li onClick={() => setOpen(false)}>
                  <i className="fa-regular fa-envelope"></i>

                  <span>تیکت ها</span>
                </li>
              </Link>
              {/*  */}
              <Link href={"my-account/edit-account"}>
                <li
                  onClick={() => setOpen(false)}
                  style={{
                    borderBottom: "1px solid rgb(225, 221, 221)",
                    paddingBottom: "19px",
                  }}
                >
                  <i className="fa-regular fa-user"></i>

                  <span>جزيیات حساب</span>
                </li>
              </Link>
              <Link href={"/logout"}>
                <li className="logout-li-profile">
                  <i className="fa-solid fa-power-off"></i>

                  <span>خروج</span>
                </li>
              </Link>
            </ol>
          </div>
          <OverlayComponent classname="active" open={open} setOpen={setOpen} />
        </>
      ) : null}
    </div>
  );
};

export default ProfileNavbar;
