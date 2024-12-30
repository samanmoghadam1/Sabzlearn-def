import Link from "next/link";

const ChatComponent = () => {
  return (
    <Link href={"/"}>
      <div
        className="text-white d-flex justify-content-center align-items-center position-fixed z-3 bottom-0 m-3 p-3 rounded-circle"
        style={{
          left: "0",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          backgroundColor: "#028be5",
          cursor: "pointer",
        }}
      >
        <i className="fa-solid fa-headset"></i>
      </div>
    </Link>
  );
};

export default ChatComponent;
