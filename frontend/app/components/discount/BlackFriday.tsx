import "./style.css";

const BlackFriday = () => {
  return (
    <div className="container">
      <div className="offer">
        <div className="text-center">
          <div className="right bell-icon d-flex flex-column">
            <i className="fa-regular fa-bell "></i>
            <span className="text">
              ۵۰ درصد تخفیف جمعه سبزلرن رو از دست نده
            </span>
            <button className="d-flex flex justify-content-around align-items-center dont-lose-btn">
              <span className="text-btn m-4">از دستش نمیدم!</span>
              <span className="arrow-btn">
                <i className="fa-solid fa-arrow-left"></i>
              </span>
            </button>
          </div>

          <div className="left d-flex justify-content-center gap-3">
            <div className=" bg-white the-circles">
              <span className="circle-number">۵۸</span>
              <br />
              <span className="circle-text">ثانیه</span>
            </div>

            <div className=" bg-white the-circles">
              <span className="circle-number">۱۸</span>
              <br />
              <span className="circle-text">دقیقه</span>
            </div>

            <div className=" bg-white the-circles active-circle">
              <span className="circle-number">۱۸</span>
              <br />
              <span className="circle-text">ساعت</span>
            </div>

            <div className=" bg-white the-circles active-circle">
              <span className="circle-number ">۲</span>
              <br />
              <span className="circle-text">روز</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFriday;
