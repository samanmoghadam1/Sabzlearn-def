"use client";

import "./style.css";
import Image from "next/image";
import Link from "next/link";
import * as Yup from "yup";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../utils/fetchData";

interface FormData {
  email: string;
  password: string;
  phone_number: string;
  name: string;
  role: number;
}

type Errors = {
  [key in keyof FormData]?: string;
};

const SignupPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/");
    }
  }, [router]);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    phone_number: "",
    name: "",
    role: 2,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("ایمیل معتبر نیست")
      .required("فیلد ایمیل الزامی است"),
    password: Yup.string()
      .min(8, "فیلد پسورد حداقل باید هشت کاراکتر باشد")
      .required("فیلد پسورد الزامی است"),
    phone_number: Yup.string()
      .matches(/^\d{11}$/, "شماره تلفن باید ۱۱ رقم باشد (با صفر ابتدای شماره)")
      .required("فیلد شماره تماس الزامی است"),
    name: Yup.string()
      .min(3, "این فیلد حداقل باید ۳ کاراکتر باشد")
      .required("فیلد نام الزامی است"),
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle sybmit

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const response = await fetch("http://127.0.0.1:8000/api/create/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("ثبت‌نام با موفقیت انجام شد!");
        router.push("/login");
      } else {
        const errorData = await response.json();
        alert("خطایی رخ داده است: " + JSON.stringify(errorData));
      }
    } catch (validationErrors: any) {
      const formattedErrors: Errors = {};
      validationErrors.inner.forEach((err: Yup.ValidationError) => {
        formattedErrors[err.path as keyof FormData] = err.message;
      });
      setErrors(formattedErrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center m-auto align-items-center w-100 overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="d-flex">
        <Image
          src={
            "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
          }
          alt="sabz Learn Icon"
          width={100}
          height={62}
        />
        <h1 className="d-flex align-items-center me-3 fw-bold">سبزلرن</h1>
      </div>
      <main className="bg-white login-main p-4 rounded-4 mt-4">
        <h3 className="text-center fw-bold">عضویت</h3>
        <p className="text-center mt-3">
          قبلا ثبت نام کرده اید؟{" "}
          <Link
            style={{ color: "rgb(87, 214, 134)", fontWeight: "bold" }}
            href={"login"}
          >
            وارد شوید
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="p-2 d-flex align-items-center login-input-container">
            <input
              className="w-100 h-100 border-0"
              type="text"
              placeholder="نام کاربری"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <i className="fa-regular fa-user"></i>
          </div>
          {errors.name && <p className="text-danger">{errors.name}</p>}

          {/* فیلد شماره موبایل */}
          <div className="p-2 d-flex align-items-center login-input-container">
            <input
              className="w-100 h-100 border-0"
              type="text"
              placeholder="شماره موبایل"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />
            <i className="fa-solid fa-phone"></i>
          </div>
          {errors.phone_number && (
            <p className="text-danger">{errors.phone_number}</p>
          )}

          {/* فیلد ایمیل */}
          <div className="p-2 d-flex align-items-center login-input-container">
            <input
              className="w-100 h-100 border-0"
              type="text"
              placeholder="آدرس ایمیل"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <i className="fa-regular fa-envelope"></i>
          </div>
          {errors.email && <p className="text-danger">{errors.email}</p>}

          {/* فیلد گذرواژه */}
          <div className="p-2 d-flex align-items-center login-input-container">
            <input
              className="w-100 h-100 border-0"
              type="password"
              placeholder="گذرواژه"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <i className="fa-solid fa-lock"></i>
          </div>
          {errors.password && <p className="text-danger">{errors.password}</p>}

          <button
            disabled={isLoading}
            type="submit"
            className="d-block m-auto mt-4 text-white btn btn-success"
          >
            {isLoading ? "در حال ارسال..." : "ادامه"}
          </button>
        </form>
      </main>
      <p style={{ fontSize: "20px" }} className="text-center mt-4">
        با عضویت در سایت، تمامی قوانین و شرایط استفاده <br /> از خدمات سبزلرن را
        پذیرفته اید.
      </p>
    </div>
  );
};

export default SignupPage;
