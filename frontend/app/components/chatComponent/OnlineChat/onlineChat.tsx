import "./onlineChat.css";

const OnlineChatComponent = ({open, setOpen}: {open: boolean, setOpen: (item: boolean)=>void}) => {
  return (
    <div className="online-chat-container ">
      <div className="online-chat-component-top">
        <div className="online-chat-component-header position-relative text-white">
          <div onClick={()=>{setOpen(false)}} className="x-mark-in-responsive-online-chat position-absolute">
            <i className="fa-solid fa-xmark "></i>
          </div>
          <h5 className="text-center ">چت آنلاین</h5>
          <p>
            لطفا در صورتی که مشکل فنی یا در خصوص پیشیبانی دوره دارید، در بخش
            پرسش پاسخ خود دوره ارسال کنید.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <img
              src="/static-images/default-avatar.png"
              alt="user avatar image"
            />
            <img
              src="/static-images/default-avatar.png"
              alt="user avatar image"
            />
            <img
              src="/static-images/default-avatar.png"
              alt="user avatar image"
            />
          </div>
        </div>
        <div className="online-chat-component-main"></div>
      </div>
      <div className="online-chat-component-input d-flex">
        <input placeholder="یک چیزی اینجا بنویس ..." type="text" />
        <button className="d-flex align-items-center justify-content-center">
          <i className="fa-regular fa-face-smile"></i>
        </button>
      </div>
    </div>
  );
};

export default OnlineChatComponent;
