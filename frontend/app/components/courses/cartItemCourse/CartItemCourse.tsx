import Image from "next/image";
import Link from "next/link";
import './cartItemCourse.css';
import { short_text } from "@/app/utils/functions";

const CartItemCourse = ({
  image,
  title,
  price,
  id,
}: {
  image: string;
  title: string;
  price: string;
  id: number;
}) => {
  return (
    <Link href={`/courses/${id}`} >
      <div dir="rtl" className="cart-item-course-container p-2">
        <Image
          className="cart-item-course-image"
          src={image}
          alt="course image"
          width={110}
          height={75}
        />
        <div className="cart-item-course-details">
          <p className="cart-item-course-title">{short_text(title, 55)}</p>
          <span className="cart-item-course-price">{price} تومان</span>
        </div>
        <i className="cart-item-course-trash fa-solid fa-trash"></i>
      </div>
    </Link>
  );
};

export default CartItemCourse;
