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
}

const Comment = ({
  id,
  user_data,
  role,
  comment,
  rate,
  created_at,
  replies,
}: commentInterFace) => {
  return (
    <div
      style={{ backgroundColor: "rgb(243 244 246)", fontSize: "16px" }}
      className="p-2 rounded-4 mt-4"
    >
      <div className="d-flex justify-content-between border-bottom  p-3">
        <div className="d-flex flex-column">
          <h5>
            {user_data.name} | <span>{role === 2 ? "دانشجو" : "مدرس"}</span>
          </h5>
          <span className="opacity-50">{created_at}</span>
        </div>
        <div
          role="button"
          style={{ width: "40px", height: "40px" }}
          className="btn border-info d-flex align-items-center justify-content-center p-2 rounded-circle  text-info reply-icon-courses"
        >
          <i className="fa-solid fa-reply"></i>
        </div>
      </div>
      <p className="opacity-75 p-3">{comment}</p>

      {replies.map((item: commentInterFace, index) => {
        return (
          <div
            key={index}
            style={{ backgroundColor: "rgb(229 231 235)", fontSize: "15px" }}
            className="p-2 m-1 rounded-3 mt-4"
          >
            <div className="d-flex justify-content-between border-bottom  p-3">
              <div className="d-flex flex-column">
                <h5>
                  {item.user_data.name} |{" "}
                  <span>{item.role === 2 ? "دانشجو" : "مدرس"}</span>
                </h5>
                <span className="opacity-50">{item.created_at}</span>
              </div>
              <div
                role="button"
                style={{ width: "40px", height: "40px" }}
                className="btn border-info d-flex align-items-center justify-content-center p-2 rounded-circle  text-info reply-icon-courses"
              >
                <i className="fa-solid fa-reply "></i>
              </div>
            </div>
            <p className="opacity-75 p-3">{item.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Comment;
