"use client";
import { useState } from "react";
import OnlineChatComponent from "./OnlineChat/onlineChat";

const ChatComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        left: "0",
        bottom: "0",
      }}
      className="position-fixed z-3"
    >
      <div className="position-relative">{open && <OnlineChatComponent open={open} setOpen={setOpen} />}</div>

      <div
        onClick={handleClick}
        className="text-white d-flex justify-content-center align-items-center  z-3  m-3 p-3 rounded-circle"
        style={{
          width: "60px",
          height: "60px",
          fontSize: "24px",
          backgroundColor: "#028be5",
          cursor: "pointer",
        }}
      >
        <i className={`fa-solid ${!open ? "fa-headset" : "fa-xmark"}`}></i>
      </div>
    </div>
  );
};

export default ChatComponent;
