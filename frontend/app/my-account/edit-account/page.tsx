"use client";

import Button from "@/app/components/elemets/Button";
import "./page.css";
import ClientUserPanel from "@/app/components/my-account/clientPanel";
import ProfileTitleComponent from "@/app/components/profileTitle/ProfileTitleComponent";
import { fetchUserData } from "@/app/utils/fetchData";
import { useEffect, useState } from "react";

const EditAccountPage = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserData();
      console.log(response);
      setUser(response);
    }
    fetchData();
  }, []);

  return (
    <div className="row mt-3 mx-3 edit-page-container">
      <ClientUserPanel />
      <div className="col-12 col-md-8 col-lg-9 col-xl-10 ">
        <ProfileTitleComponent title="جزئیات حساب کاربری" />
        <div className="row   ">
          <div className="col-lg-6  col-md-12 col-sm-12 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">نام و نام خانوادگی</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                defaultValue={user.name}
                className="border-0 p-3 rounded-end "
              />
              <i className="fa-regular fa-address-card bg-white p-4 py-4 rounded-start"></i>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">نام کاربری</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                defaultValue={user.name || ""}
                className="border-0 p-3 rounded-end "
                readOnly
              />
              <i className="fa-regular fa-address-card bg-white p-4 rounded-start"></i>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12  mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">ایمیل</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                defaultValue={user.email}
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-regular fa-envelope  bg-white p-4 py-4 rounded-start"></i>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12  mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">شماره تلفن</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                defaultValue={user.phone_number}
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-solid fa-mobile bg-white p-4 py-4 rounded-start"></i>
            </div>
          </div>

          <div className="btn-container-in-edit-account-page col-12 row mt-5 ">
            <div className="col-md-6 col-sm-6 col-12">
              <button className=" edit-account-custom-button p-3 rounded-1 w-75 bg-transparent">
                آپلود عکس پروفایل
              </button>
            </div>

            <div className="col-md-6 col-sm-6 col-12 text-start ">
              <Button
                style={{ fontSize: "14px" }}
                className="p-3 w-50 the-submit-edit-page me-auto "
                disable={false}
                title="ویرایش حساب کاربری"
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12  mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">رمز عبور فعلی</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input type="text" className="border-0 p-3 rounded-end" />
              <i className="fa-solid fa-lock bg-white p-4 py-4 rounded-start"></i>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 col-sm-12  mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">رمز عبور جدید</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input type="text" className="border-0 p-3 rounded-end" />
              <i className="fa-solid fa-lock bg-white p-4 py-4 rounded-start"></i>
            </div>
          </div>

          <div className="col-lg-6 mx-3 me-auto my-5 text-start">
            <div className="">
              <button className=" edit-account-custom-button p-3 rounded-1 w-50 bg-transparent text-center ">
                تغییر رمز عبور
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;
