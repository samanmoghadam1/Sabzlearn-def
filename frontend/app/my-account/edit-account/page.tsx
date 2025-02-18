"use client";

import Button from "@/app/components/elemets/Button";
import "./page.css";
import ClientUserPanel from "@/app/components/my-account/clientPanel";
import ProfileTitleComponent from "@/app/components/profileTitle/ProfileTitleComponent";
import { fetchUserData } from "@/app/utils/fetchData";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import * as yup from "yup";
import customFetch from "@/app/utils/custom_fetch";

const EditAccountPage = () => {
  // تعریف اینترفیس اطلاعات کاربر
  interface userInfoInterFace {
    name: string;
    email: string;
    phoneNumber: string;
    avatar: any;
  }
  interface PasswordInfoInterFace {
    old_password: string;
    new_password: string;
  }

  const [user, setUser] = useState<any>({});
  const [userInfo, setUserInfo] = useState<userInfoInterFace>({
    name: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });

  const [passwordInfo, setPasswordInfo] = useState<PasswordInfoInterFace>({
    old_password: "",
    new_password: "",
  });

  const [editAccountButtonLoading, setEditAccountButtonLoading] =
    useState(false);
  const [editPasswordLoading, setEditPasswordLoading] = useState(false);

  type Errors = {
    [key in keyof userInfoInterFace]?: string;
  };

  type PasswordErrors = {
    [key in keyof PasswordInfoInterFace]?: string;
  };

  const [errors, setErrors] = useState<Errors>({});
  const [passwordErrors, setPasswordErrors] = useState<PasswordErrors>({});

  // اعتبارسنجی با yup: توجه کنید که شماره تلفن به عنوان رشته و با regex بررسی می‌شود
  const validationEditInformationSchema = yup.object().shape({
    email: yup
      .string()
      .email("این ایمیل معتبر نیست")
      .required("فیلد ایمیل الزامی است"),
    name: yup.string().required("فیلد نام و نام خانوادگی الزامی است"),
    phoneNumber: yup
      .string()
      .matches(/^\d+$/, "فیلد شماره تلفن الزامی است و باید عدد باشد")
      .required("فیلد شماره تلفن الزامی است و باید عدد باشد"),
  });

  const validationPasswordSchema = yup.object().shape({
    old_password: yup
      .string()
      .required("فیلد پسورد فعلی اجباری است")
      .min(5, "فیلد پسورد فعلی باید 5 یا بیشتر از 5 کاراکتر باشد"),
    new_password: yup
      .string()
      .required("فیلد رمز عبور جدید الزامی است")
      .min(5, "فیلد پسورد جدید باید 5 یا بیشتر از 5 کاراکتر باشد"),
  });

  const handlePasswordSubmit = async () => {
    try {
      await validationPasswordSchema.validate(passwordInfo, {
        abortEarly: false,
      });
      setPasswordErrors({});
    } catch (error: any) {
      if (error.inner && Array.isArray(error.inner)) {
        const formattedErrors: PasswordErrors = {};
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            formattedErrors[err.path as keyof PasswordInfoInterFace] =
              err.message;
          }
        });
        setPasswordErrors(formattedErrors);
        console.log("Password Errors found", formattedErrors);
        return;
      } else {
        console.log("API Error: ", error);
        return;
      }
    } finally {
      console.log("password error is: ", passwordErrors);
    }

    try {
      setEditPasswordLoading(true);
      const response: any = await customFetch(
        "http://127.0.0.1:8000/profile/update-password/",
        "PUT",
        {
          old_password: passwordInfo.old_password,
          new_password: passwordInfo.new_password,
        }
      );

      window.location.href = "/my-account/edit-account";
    } catch (error) {
      console.log(error);
    } finally {
      setEditPasswordLoading(false);
    }
  };

  // تابع ثبت اطلاعات و ارسال به سرور
  const handleSubmitEdit = async () => {
    try {
      // اعتبارسنجی فرم (با abortEarly: false تا همه خطاها جمع‌آوری شود)
      await validationEditInformationSchema.validate(userInfo, {
        abortEarly: false,
      });
      setErrors({});
    } catch (error: any) {
      if (error.inner && Array.isArray(error.inner)) {
        const formattedErrors: Errors = {};
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            formattedErrors[err.path as keyof userInfoInterFace] = err.message;
          }
        });
        setErrors(formattedErrors);
        console.log("Errors found: ", formattedErrors);
        return; // در صورت وجود خطا، از ادامه اجرای تابع جلوگیری می‌کنیم
      } else {
        console.error("API Error:", error);
        return;
      }
    }

    // آماده‌سازی فرم دیتا جهت ارسال به سرور
    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("phone_number", userInfo.phoneNumber);

    if (userInfo.avatar && userInfo.avatar instanceof File) {
      formData.append("avatar", userInfo.avatar);
    }

    try {
      setEditAccountButtonLoading(true); 
      const response = await fetch("http://127.0.0.1:8000/profile/update/", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      window.location.href = "/my-account/edit-account";
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    finally {
      setEditAccountButtonLoading(false);
    }
  };

  // بارگذاری اطلاعات کاربر در ابتدا
  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserData();
      setUser(response);
      setUserInfo({
        avatar: response.avatar || "",
        email: response.email,
        name: response.name,
        phoneNumber: response.phone_number,
      });
    }
    fetchData();
  }, []);

  // مدیریت آپلود فایل
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserInfo({ ...userInfo, avatar: file });
    }
  };

  return (
    <div className="row mt-3 mx-3 edit-page-container">
      <ClientUserPanel />
      <div className="col-12 col-md-8 col-lg-9 col-xl-10 ">
        <ProfileTitleComponent title="جزئیات حساب کاربری" />
        <div className="row">
          {/* ورودی نام و نام خانوادگی */}
          <div className="col-lg-6 col-md-12 col-sm-12 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">نام و نام خانوادگی</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.currentTarget.value })
                }
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-regular fa-address-card bg-white p-4 py-4 rounded-start"></i>
            </div>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          {/* ورودی نام کاربری (غیرقابل ویرایش) */}
          <div className="col-lg-6 col-md-12 col-sm-12 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">نام کاربری</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                value={user.name || ""}
                className="border-0 p-3 rounded-end"
                disabled
              />
              <i
                style={{ backgroundColor: "#f7f7f7" }}
                className="fa-regular fa-address-card p-4 rounded-start"
              ></i>
            </div>
          </div>

          {/* ورودی ایمیل */}
          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">ایمیل</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.currentTarget.value })
                }
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-regular fa-envelope bg-white p-4 py-4 rounded-start"></i>
            </div>
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          {/* ورودی شماره تلفن */}
          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">شماره تلفن</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                type="text"
                value={userInfo.phoneNumber}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    phoneNumber: e.currentTarget.value,
                  })
                }
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-solid fa-mobile bg-white p-4 py-4 rounded-start"></i>
            </div>
            {errors.phoneNumber && (
              <span className="text-danger">{errors.phoneNumber}</span>
            )}
          </div>

          {/* بخش آپلود عکس پروفایل و دکمه ویرایش حساب */}
          <div className="btn-container-in-edit-account-page col-12 row mt-5">
            <div className="col-md-6 col-sm-6 col-12">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                onClick={handleClick}
                className="edit-account-custom-button p-3 rounded-1 w-75 bg-transparent"
              >
                آپلود عکس پروفایل
              </button>
            </div>

            <div className="col-md-6 col-sm-6 col-12 text-start">
              <Button
                onclick={handleSubmitEdit}
                style={{ fontSize: "14px" }}
                className="p-3 w-50 the-submit-edit-page me-auto"
                disable={editAccountButtonLoading}
                title={`${editAccountButtonLoading ? 'در حال بررسی': 'ویرایش حساب کاربری'}`}
              />
            </div>
          </div>

          {/* بخش تغییر رمز عبور فعلی */}
          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">رمز عبور فعلی</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                onChange={(e) => {
                  setPasswordInfo({
                    ...passwordInfo,
                    old_password: e.target.value,
                  });
                }}
                type="password"
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-solid fa-lock bg-white p-4 py-4 rounded-start"></i>
            </div>
            {passwordErrors.old_password && (
              <span className="text-danger">{passwordErrors.old_password}</span>
            )}
          </div>

          {/* بخش تغییر رمز عبور جدید */}
          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 input-container-in-edit-page">
            <h6 className="mt-2 mb-4">رمز عبور جدید</h6>
            <div className="d-flex input-in-edit-account-page-container">
              <input
                onChange={(e) => {
                  setPasswordInfo({
                    ...passwordInfo,
                    new_password: e.target.value,
                  });
                }}
                type="password"
                className="border-0 p-3 rounded-end"
              />
              <i className="fa-solid fa-lock bg-white p-4 py-4 rounded-start"></i>
            </div>
            {passwordErrors.new_password && (
              <span className="text-danger">{passwordErrors.new_password}</span>
            )}
          </div>

          {/* دکمه تغییر رمز عبور */}
          <div className="col-lg-6 mx-3 me-auto my-5 text-start">
            <div className="">
              <button
                disabled={editPasswordLoading}
                onClick={handlePasswordSubmit}
                className="edit-account-custom-button p-3 rounded-1 w-50 bg-transparent text-center"
              >
                {editPasswordLoading ? "در حال بررسی" : "تغییر رمز عبور"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountPage;

// آدرس API: http://127.0.0.1:8000/profile/update/
