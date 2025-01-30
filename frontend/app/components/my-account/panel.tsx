import Image from "next/image";
import "./panel.css";
import { fetchUserDataFromServer } from "@/app/utils/fetchDataServer";
import PanelItem from "./items/panelItems";

const UserPanel = async () => {
  const user = await fetchUserDataFromServer();

  return (
    <div className="user-panel-sidebar-container d-none bg-white d-sm-none d-md-block col-md-4 col-lg-3 col-xl-2 overflow-scroll overflow-x-hidden ">
      <div
        className="
          user-info-in-user-panel 
          text-center mt-3 rounded-1
          text-white 
          p-2 
          position-relative 
          w-100"
      >
        <h6>{user.name}</h6>
        <span style={{ fontSize: "12px" }} className="h6">
          پنجشنبه 4 بهمن 1403
        </span>

        <Image
          alt="user image"
          className="rounded-circle user-image-in-user-panel"
          width={100}
          height={100}
          src={`http://127.0.0.1:8000/${user.avatar}`}
        />
      </div>

      <div className="user-panel-items mt-5">
        <PanelItem icon="fa-solid fa-solar-panel" title={'پنل کاربری'} link={'/my-account'} />
        <PanelItem icon="fa-solid fa-graduation-cap" title={'دوره های من'} link={'/my-account/courses'} />
        <PanelItem icon="fa-solid fa-credit-card" title={'کیف پول و تراکنشها'} link="/my-account/orders" />
        <PanelItem icon="fa-solid fa-comments" title={'تیکت ها'} link="/my-account/tickets"/>
        <PanelItem icon="fa-solid fa-question" title={'پرسش های من'} link="/my-account/qaa"/>
        <PanelItem icon="fa-regular fa-pen-to-square" title={'ویرایش حساب'} link="/my-account/edit-account"/>

      </div>
    </div>
  );
};

export default UserPanel;
