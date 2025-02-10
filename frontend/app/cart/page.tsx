"use client";

import { useEffect, useState } from "react";
import { fetchCoursesByUserOrder } from "../utils/fetchData";
import { CartItemInterface } from "../components/navbar/Navbarfeature/basket/Basket";
import CartInPage from "../components/courses/cartItemCourse/cartInCartPage/CartInPage";
import Link from "next/link";
import customFetch from "../utils/custom_fetch";
import { useRouter } from "next/navigation";
import "./page.css";

const Cart = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [courses, setCourses] = useState<CartItemInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const courses: any = await fetchCoursesByUserOrder();
      if (courses.length === 0) {
        router.push("/courses");
      }
      setCourses(courses);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const response = courses.reduce(
      (total: number, item: CartItemInterface) => {
        return (total += parseInt(item.course_data.price));
      },
      0
    );
    setTotalPrice(response);
  }, [courses]);

  async function handleSubmit() {
    // 'id', 'user', 'order', 'price', 'payment_date', 'is_successful'
    const order_id: number = courses[0].order;
    try {
      const response = await customFetch(
        "http://127.0.0.1:8000/orders/add/payemnts/",
        "POST",
        {
          order: order_id,
          price: totalPrice,
          is_successful: true,
        }
      );
      window.location.href = "/cart";
    } catch (error) {
      console.log("error: ", error);
    }
  }

  return (
    <div className="my-4 m-4 row p-xl-0 gap-4 gap-sm-4 gap-md-0 cart-page-container">
      <div className="col-md-8">
        <div
          style={{ backgroundColor: "var(--sabzlearn-color)" }}
          className="product-basket-nav d-flex gap-3 align-items-center text-white p-3 rounded-top-4"
        >
          <i className="fas fa-bag-shopping h2"></i>
          <h6 className="fw-bold">سبد خرید</h6>
        </div>

        <div className="conrainer-fluid bg-white rounded-bottom-4 shadow-lg">
          <div className="row">
            {courses.map((item, index) => {
              return (
                <div className="col-12 mt-3" key={index}>
                  <CartInPage
                    description={item.course_data.description}
                    id={item.course_data.id}
                    image={item.course_data.image}
                    offer={item.course_data.offer}
                    point={item.course_data.point}
                    price={parseInt(item.course_data.price)}
                    studentsNumber={28}
                    teacher={item.course_data.user_data.name}
                    title={item.course_data.name}
                    user_id={item.course_data.user_data.id}
                    key={index}
                    courses={courses}
                    setCourses={setCourses}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="bg-white rounded-4 shadow-lg col-md-4"
        style={{ maxHeight: "387px" }}
      >
        <div
          style={{ backgroundColor: "var(--sabzlearn-color)" }}
          className="mt-4 product-basket-nav d-flex gap-3 align-items-center text-white p-3 rounded-top-4"
        >
          <i className="fas fa-credit-card h2"></i>

          <h6 className="fw-bold">اطلاعات پرداخت</h6>
        </div>

        <div className="mt-2 p-3 rounded-bottom-4">
          <div className="d-flex justify-content-between opacity-75">
            <span style={{ fontWeight: 500 }} className="h6">
              مبلغ کل
            </span>
            <span>
              {" "}
              <span className=" h5"> {totalPrice}</span> تومان
            </span>
          </div>
          <div className="d-flex justify-content-between opacity-75 border-bottom pb-3">
            <span className="mt-4 h6">موجودی کیف پول</span>
            <span className="mt-4">
              {" "}
              <span className=" h5">۰</span> تومان
            </span>
          </div>

          <div className="d-flex justify-content-between pb-3 ">
            <span className="mt-4 h6 fw-bold">مجموع: </span>
            <span className="mt-4">
              {" "}
              <span className="h5 fw-bold">{totalPrice}</span> تومان
            </span>
          </div>
          <div className="d-flex gap-2 align-items-center" style={{}}>
            <input
              type="checkbox"
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span style={{ fontSize: "13px" }}>
              قوانین و مقررات را مطالعه نموده ام{" "}
              <Link className="text-info" href={"/terms-conditions"}>
                (مشاهده)
              </Link>
            </span>
          </div>

          <button
            disabled={!isChecked}
            onClick={handleSubmit}
            onMouseOver={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "var(--sabzlearn-color-darker)")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "var(--sabzlearn-color)")
            }
            className="btn d-block w-100 mt-3 text-white"
            style={{ backgroundColor: "var(--sabzlearn-color)" }}
          >
            تکمیل خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
