import "./CartInPage.css";

import Image from "next/image";

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
}: CourseProps) => {
  return (
    <div className=" position-relative d-flex justify-content-center align-items-center flex-column ">
      <Image
        className="mt-3 rounded-3 mb-3"
        src={image}
        width={280}
        height={150}
        alt="course image"
      />
      <div className="x-container-for-cart position-absolute bg-white p-1 rounded-circle d-flex justify-content-center align-items-center">
        <i className="fa-solid fa-xmark"></i>
      </div>
      <h6 style={{ fontSize: "15px" }}>{title}</h6>
      <div className="d-block w-100 ">
        <div className="d-flex justify-content-between p-3 px-5 align-items-center">
          <span style={{ fontSize: "15px" }} className="opacity-50">
            {teacher}
          </span>
          <span style={{ color: "var(--sabzlearn-color)" }}>
            <span style={{ color: "var(--sabzlearn-color-darker)" }}>
              {price}
            </span>{" "}
            تومان
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartInPage;
