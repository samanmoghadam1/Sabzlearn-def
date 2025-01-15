"use client";

import { commentInterFace } from "@/app/components/commentComponent/Comment";
import Comment from "@/app/components/commentComponent/Comment";
import customServerFetch from "@/app/utils/custom_fetch_server";
import { UserInterface } from "@/app/utils/fetchDataServer";
import Image from "next/image";
import { useState } from "react";
const ReviewsComponent = ({
  courseId,
  reviews,
  user,
}: {
  courseId: number;
  reviews: commentInterFace[];
  user: UserInterface;
}) => {
  const [text, setText] = useState("");
  const [reply, setReply] = useState(-1);
  const [open, setOpen] = useState(false);
  // now complite reply ;
  async function sendComment() {
    if (reply === -1) {
      try {
        const response = await customServerFetch(
          `http://127.0.0.1:8000/reviews/create/${courseId}/`,
          "POST",
          { comment: text }
        );
        if (response) {
          setText("");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // http://127.0.0.1:8000/reviews/reply/create/1/
        const response = await customServerFetch(
          `http://127.0.0.1:8000/reviews/reply/create/${reply}/`,
          "POST",
          {
            text: text,
          }
        );
        if (response) {
          setText("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h4>نظرات</h4>
        <button
          onClick={() => {
            setOpen(true);
            setReply(-1);
          }}
          onMouseOver={(e: any) =>
            (e.currentTarget.style =
              "background-color: var(--sabzlearn-color-darker)")
          }
          onMouseLeave={(e: any) =>
            (e.currentTarget.style = "background-color: var(--sabzlearn-color)")
          }
          style={{ backgroundColor: "var(--sabzlearn-color)" }}
          className="btn rounded-2 text-white "
        >
          ایجاد نظر جدید
        </button>
      </div>
      <div className={open ? "d-block" : "d-none"}>
        {/* start of comment Box */}
        <div className="user-comment-profile d-flex">
          <Image
            width={65}
            height={65}
            className="rounded-circle p-1 border"
            src={`http://127.0.0.1:8000/${user.avatar}`}
            alt=""
          />
          <div className="d-flex flex-column px-3 mt-2">
            <h6 className="fw-bold">{user.name}</h6>
            <p style={{ fontSize: "14px" }} className="opacity-50 pt-1 ">
              ثبت نظر جدید
            </p>
          </div>
        </div>

        <div>
          <textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setText(e.target.value);
            }}
            placeholder="نظر خود را بنویسید ..."
            className="w-100 rounded-3 p-4 px-4 text-area-for-comment-course"
          />
          <div className="d-flex mt-4">
            <button
              onClick={() => setOpen(false)}
              className="bg-white w-50 p-2 mx-1  rounded-2 cancle-cooment-btn"
            >
              لغو
            </button>
            <button
              onClick={sendComment}
              className="w-50 p-2 mx-1 border-0 rounded-2 text-white send-comment-btn"
            >
              ارسال
            </button>
          </div>
        </div>
        {/* end of comment Box */}
      </div>

      <div
        className="mt-4 p-3 rounded-3"
        style={{ backgroundColor: "rgb(240 253 244)" }}
      >
        <p
          style={{ color: "rgba(34 197 94)", fontSize: "15px" }}
          className="opacity-100"
        >
          دانشجوی عزیز؛ سوالات مرتبط به پشتیبانی دوره در قسمت نظرات تایید نخواهد
          شد، لطفا در بخش مشاهده آنلاین هر ویدیو سوالات خود را مطرح کنید.
        </p>
      </div>
      {reviews.map((item: commentInterFace, index: number) => {
        return (
          <Comment
            comment={item.comment}
            created_at={item.created_at}
            rate={item.rate}
            id={item.id}
            replies={item.replies}
            role={item.role}
            user_data={item.user_data}
            key={index}
            reply={reply}
            setReply={setReply}
            open={open}
            setOpen={setOpen}
          />
        );
      })}
    </>
  );
};

export default ReviewsComponent;
