"use client";

import { useEffect, useState } from "react";
import { fetchCoursesByUserOrder } from "../utils/fetchData";
import { CartItemInterface } from "../components/navbar/Navbarfeature/basket/Basket";
import CartInPage from "../components/courses/cartItemCourse/cartInCartPage/CartInPage";
import Link from "next/link";

const Cart = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [courses, setCourses] = useState<CartItemInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const courses = await fetchCoursesByUserOrder();
      setCourses(courses);
    }
    fetchData();
  }, []);

  useEffect(() => {
    
    const response = courses.reduce((total: number, item: CartItemInterface)=> {return total += parseInt(item.course_data.price)}, 0)
    setTotalPrice(response); 
  }, [courses]);

  return (
    <div className="my-4 m-4">
      <div>
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
                <div className="col-12 col-md-6 col col-lg-4" key={index}>
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
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-4 shadow-lg">
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
          {/* <Button style={{fontSize: "15px"}} disable={true} className="mt-3 rounded-3 p-2" title="تکمیل خرید"/> */}
          <button
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
            disabled={!isChecked}
          >
            تکمیل خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
