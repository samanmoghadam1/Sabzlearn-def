// "use client";

// import Course from "@/app/components/courses/Courses";
// import OverlayComponent from "@/app/components/overlay/overlayComponent";
// import { fetchCoursesByUserOrder } from "@/app/utils/fetchData";
// import { short_text } from "@/app/utils/functions";
// import { useEffect, useState } from "react";
// import './basket.css';

// interface CartItemInterface {
//   id: number;
//   user: number;
//   order: number;
//   course: number;
//   added_at: string;
//   course_data: {
//     offer: number;
//     id: number;
//     name: string;
//     description: string;
//     discount: number;
//     free: boolean;
//     highlight: string;
//     number_of_sessions: number;
//     point: number;
//     price: number;
//     image: string;
//     created_at: string;
//     category_data: {
//       id: number;
//       name: string;
//       description: string;
//     };
//     user_data: {
//       id: number;
//       name: string;
//       email: string;
//       image: string | null;
//     };
//   };
// }

// const BasketNavbar = () => {
//   const [open, setOpen] = useState(false);
//   const [courses, setCourses] = useState<CartItemInterface[]>([]);

//   useEffect(() => {
//     async function get_data() {
//       const response = await fetchCoursesByUserOrder();
//       console.log( 'navbar response is',response);
//       setCourses(response);
//     }
//     get_data();
//   }, []);

//   return (
//     <div>
//       <button
//         onClick={() => setOpen(!open)}
//         className={`navbar-list-icons border-0 ${
//           open ? "position-relative z-3" : ""
//         }`}
//       >
//         <i className="fa-solid fa-cart-shopping "></i>
//       </button>

//       {open ? (
//         <>
//           <div
//             className="position-absolute bg-white rounded-3"
//             style={{
//               zIndex: "1000",
//               right: 10,
//               marginTop: "10px",
//               minWidth: "360px",
//               width: "380px"
//             }}
//           >
//             <div
//               className="d-flex justify-content-between p-3 rounded-3"
//               style={{ backgroundColor: "rgba(10 151 212 0.6)" }}
//             >
//               <span className="text-info fw-bold">سبد خرید من</span>
//               <span>{courses.length} دوره</span>
//             </div>
//             <div
//               className="text-center p-4 "
//               style={{ color: "rgb(100 116 139)", fontSize: "20px" }}
//             >
//               {!courses.length ? (
//                 <span>سبد شما خالیست :(</span>
//               ) : (
//                 <div style={{width: '350', maxHeight: "400px", overflow: "scroll"}}>
//                   {courses.map((item: CartItemInterface, index) => {
//                     return (
//                       <Course
//                         description={short_text(item.course_data.description, 75)}
//                         id={item.id}
//                         offer={item.course_data.offer}
//                         image={item.course_data.image}
//                         point={item.course_data.point}
//                         price={item.course_data.price}
//                         studentsNumber={554}
//                         teacher={item.course_data.user_data.name}
//                         title={item.course_data.name}
//                         user_id={item.course_data.user_data.id}
//                         key={item.id}
//                       />
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>
//           <OverlayComponent classname="active" open={open} setOpen={setOpen} />
//         </>
//       ) : null}
//     </div>
//   );
// };

// export default BasketNavbar;

"use client";
export const dynamic = 'force-dynamic'

import OverlayComponent from "@/app/components/overlay/overlayComponent";
import { fetchCoursesByUserOrder } from "@/app/utils/fetchData";
import { useEffect, useState } from "react";
import "./basket.css";
import CartItemCourse from "@/app/components/courses/cartItemCourse/CartItemCourse";
import Button from "@/app/components/elemets/Button";

export interface CartItemInterface {
  id: number;
  user: number;
  order: number;
  course: number;
  added_at: string;
  course_data: {
    offer: number;
    id: number;
    name: string;
    description: string;
    discount: number;
    free: boolean;
    highlight: string;
    number_of_sessions: number;
    point: number;
    price: string;
    image: string;
    created_at: string;
    category_data: {
      id: number;
      name: string;
      description: string;
    };
    user_data: {
      id: number;
      name: string;
      email: string;
      image: string | null;
    };
  };
}

const BasketNavbar = ({ btnStyle }: { btnStyle?: {} }) => {
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<CartItemInterface[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    async function get_data() {
      const response: any = await fetchCoursesByUserOrder();
      setCourses(response);
    }
    get_data();
  }, []);

  useEffect(() => {
    const totalCoursePrice = courses.reduce(
      (total, item) => (total += parseInt(item.course_data.price)),
      0
    );
    setTotalPrice(totalCoursePrice);
  }, [courses]);

  

  return (
    <div className="position-relative ">
      <button
        style={btnStyle}
        onClick={() => setOpen(!open)}
        className={`navbar-list-icons border-0  ${
          open ? "position-relative z-3" : ""
        }`}
      >
        <i
          className={`fas fa-bag-shopping ${btnStyle ? " text-white" : null}`}
        ></i>
      </button>

      {open ? (
        <>
          <div className="basket-dropdown">
            <div className="basket-header">
              <span className="basket-header-text">سبد خرید من</span>
              <span className="opacity-50">{courses.length} دوره</span>
            </div>
            <div className="basket-content">
              {!courses.length ? (
                <span>سبد شما خالیست :(</span>
              ) : (
                <>
                  <div dir="ltr" className="basket-courses border-bottom ">
                    {courses.map((item: CartItemInterface, index) => {
                      return (
                        <div key={index} className="mb-1">
                          <CartItemCourse
                            id={item.course_data.id}
                            image={item.course_data.image}
                            price={item.course_data.price}
                            title={item.course_data.name}
                            key={index}
                            courses={courses} 
                            setCourses = {setCourses}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <span style={{ fontSize: "16px" }}>
                        مبلغ قابل پرداخت:‌
                      </span>
                      <span style={{ fontSize: "16px", color: "black" }}>
                        {" "}
                        <span className="fw-bold">{totalPrice}</span> تومان{" "}
                      </span>
                    </div>
                    <Button
                      disable={false}
                      title="مشاهده سبد خرید"
                      link="/cart"
                      open={open}
                      setOpen={setOpen}
                      className="mt-4"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <OverlayComponent classname="active" open={open} setOpen={setOpen} />
        </>
      ) : null}
    </div>
  );
};

export default BasketNavbar;
