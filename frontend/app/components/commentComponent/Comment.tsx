"use client";

export interface commentInterFace {
  id: number;
  user_data: {
    id: number;
    name: string;
    email: string;
  };
  comment: string;
  rate: number;
  created_at: string;
  replies: [];
  role: number;
  reply?: number;
  setReply: (item: number) => void;
  setOpen: (item: boolean) => void;
  open: boolean;
}

const Comment = ({
  id,
  user_data,
  role,
  comment,
  rate,
  created_at,
  replies,
  reply,
  setReply,
  setOpen
}: commentInterFace) => {
  const dateString = created_at.split("T")[0].split("-");
  const date = `${dateString[0]}/${dateString[1]}/${dateString[2]}`;
  return (
    <div
      style={{ backgroundColor: "rgb(243 244 246)", fontSize: "16px" }}
      className="p-2 rounded-4 mt-4"
    >
      <div className="d-flex justify-content-between border-bottom  p-3">
        <div className="d-flex flex-column">
          <h6>
            {user_data.name} |{" "}
            <span className="fw-bold">{role === 2 ? "دانشجو" : "مدرس"}</span>
          </h6>
          <span className="opacity-50">{date}</span>
        </div>
        <div
          onClick={() => {
            setReply(id);
            setOpen(true)
          }}
          role="button"
          style={{ width: "40px", height: "40px" }}
          className="btn border-info d-flex align-items-center justify-content-center p-2 rounded-circle  text-info reply-icon-courses"
        >
          <i className="fa-solid fa-reply"></i>
        </div>
      </div>
      <p style={{ fontSize: "14px" }} className="opacity-75 p-3">
        {comment}
      </p>

      {replies.map((item: commentInterFace, index) => {
        const dateString = item.created_at.split("T")[0].split("-");
        const date = `${dateString[0]}/${dateString[1]}/${dateString[2]}`;
        return (
          <div
            key={index}
            style={{ backgroundColor: "rgb(229 231 235)", fontSize: "15px" }}
            className="p-2 m-1 rounded-3 mt-4"
          >
            <div className="d-flex justify-content-between border-bottom  p-3">
              <div className="d-flex flex-column">
                <h6>
                  {item.user_data.name} |{" "}
                  <span className="fw-bold">
                    {item.role === 2 ? "دانشجو" : "مدرس"}
                  </span>
                </h6>
                <span className="opacity-50">{date}</span>
              </div>
            </div>
            <p style={{ fontSize: "14px" }} className="opacity-75 p-3">
              {item.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
