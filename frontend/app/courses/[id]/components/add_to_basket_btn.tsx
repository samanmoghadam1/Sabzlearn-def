"use client";

import customFetch from "@/app/utils/custom_fetch";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const AddToBasketButton = ({ id }: { id: number }) => {
  const [inBasket, setInBasket] = useState(false);
  useEffect(() => {
    if (Cookies.get(`course_basket${id}`)) {
      setInBasket(true);
    }
  }, [Cookies.get(`course_basket${id}`)]);
  async function handleClicked() {
    const response = await customFetch(
      "http://127.0.0.1:8000/orders/cart/create/",
      "POST",
      {
        course_id: id,
      }
    );

    if (response) {
      Cookies.set(`course_basket${id}`, "true");
      setInBasket(true);
      window.location.href = `/cart`;
    }
  }

  setInterval(() => {
    if (!Cookies.get(`course_basket${id}`) && inBasket === false) {
      setInBasket(false);
    }
  }, 3000);

  async function handleClickedDelete() {
    try {
      let response = await customFetch(
        `http://127.0.0.1:8000/orders/cart/delete/${id}/`,
        "DELETE",
        undefined
      );
      if (response) {
        Cookies.remove(`course_basket${id}`);
        setInBasket(false);
        window.location.href = `/courses/${id}`;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return !inBasket ? (
    <button
      onClick={handleClicked}
      className="text-white  rounded-5 d-block w-100 p-3 mt-4 add-to-basket-btn"
    >
      <span className="h5">افزودن به سبد خرید</span>
    </button>
  ) : (
    <button
      onClick={handleClickedDelete}
      className="text-white bg-danger  rounded-5 d-block w-100 p-3 mt-4 add-to-basket-btn"
    >
      <span className="h5">حذف از سبد خرید</span>
    </button>
  );
};

export default AddToBasketButton;
