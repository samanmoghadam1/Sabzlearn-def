import { handleClickedDeleteCartItem } from "@/app/utils/fetchData";
import "./CartInPage.css";

import Image from "next/image";
import { CartItemInterface } from "@/app/components/navbar/Navbarfeature/basket/Basket";
import { toPersianNumber } from "@/app/utils/functions";

interface CourseProps {
  offer: null | number;
  image: string;
  title: string;
  description: string;
  point: number;
  teacher: string;
  studentsNumber: number;
  price: number;
  id: number;
  user_id: number;
  courses: CartItemInterface[];
  setCourses: (courses: CartItemInterface[]) => void;
}

const CartInPage = ({
  offer,
  image,
  title,
  description,
  point,
  teacher,
  price,
  studentsNumber,
  id,
  user_id,
  courses,
  setCourses,
}: CourseProps) => {
  console.log(image);
  return (
    <div className="row m-1 justify-content-between cart-item-component-container">
      <div className="col-12 col-sm-4 course-image-contaoner-in-cart-page-component">
        <div className="position-relative course-image-in-container">
          <Image
            src={image}
            width={156}
            height={88}
            alt="course image"
            className="m-sm-3 rounded-3"
          ></Image>
          <div
            style={{ width: "15px", height: "15px", fontSize: "10px" }}
            className="bg-white position-absolute top-0 m-2 rounded-circle d-flex align-items-center text-center justify-content-center d-sm-none"
          >
            <i className="fas fa-xmark "></i>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-5 d-flex flex-column gap-2 coursein-cart-page-component me-3 justify-content-center">
        <h6 className="mt-3">{title}</h6>
        <span className="opacity-75 d-none d-sm-block">{teacher}</span>
      </div>

      <div className="col-sm-1 d-flex align-items-center justify-content-between text-center description-cart-item-component">
        <span className="opacity-75 d-sm-none">{teacher}</span>
        <h6 style={{color: "var(--sabzlearn-color)"}}>تومان {toPersianNumber(price)}</h6>
      </div>
      <div className="col-0 d-none d-sm-flex col-sm-1 align-items-center text-center justify-content-center opacity-25 trash-container-in-cartItem-page-component">
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default CartInPage;
