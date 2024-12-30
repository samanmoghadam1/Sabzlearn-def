import './footer.css'

import Image from "next/image";

const Footer = () => {
  return (
    <div className="container-fluid bg-white px-4 ">
      <div className="d-flex justify-content-between pt-4 ">
        <div>
          <Image
            src={
              "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            }
            alt="sabzlearn icon"
            width={60}
            height={47}
          />
          <h1 className="mx-2 d-inline">سبزلرن</h1>
        </div>

        <div className="d-flex justify-content-center gap-3 footer-icons-container">
          <i className="fab fa-instagram footer-icons"></i>
          <i className="fab fa-telegram-plane footer-icons"></i>
        </div>
      </div>

      <div className='container-fluid mt-4 pb-3' style={{color: 'rgb(124 124 124)', fontSize: "14px"}}>
            <div className="row">
                <div className="col-6 " >
                    <i style={{fontSize: '20px'}} className="fas fa-phone-alt ms-2"></i>
                    <span>02191030926</span>
                </div>
                <div className="col-6">
                    <i style={{fontSize: '20px'}} className="fas fa-envelope ms-2"></i>
                    <span>somthing@gmail.com</span>
                </div>
                <div className="col-6 mt-4">
                    <i style={{fontSize: '20px'}} className="fab fa-telegram-plane ms-2"></i>
                    <span>saman_moqhadam@</span>
                </div>
            </div>
      </div>
      <hr style={{color: 'rgb(112 112 112)'}}/>

      <div className="about-sabzlearn-footer mt-4">
        <h5 className='fw-bold mb-3'>درباره سبزلرن</h5>
        <p>شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی،با خیال راحت و بدون استرس میتونی از مسیر لذت ببری. ما در سبزلرن، توی سفر به دنیای برنامه نویسی کنارت هستیم تا باهم رشد کنیم و از نتیجه زحمات مون لذت ببریم.</p>
      </div>

      <div className="footer-category mt-5">
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <h6 className='fw-bold'>دوره های پرطرفدار</h6>
                    <ol className='list-unstyled p-1' >
                        <li>آموزش پایتون</li>
                        <li>آموزش Html</li>
                        <li>آموزش Css</li>
                        <li>پروژه های خلاقانه با Html و Css</li>
                    </ol>
                </div>
                <div className="col-6 ">
                    <h6 className='fw-bold'>دسترسی سریع</h6>
                    <ol className='list-unstyled p-1' >
                        <li>قوانین و مقررات</li>
                        <li>ارسال تیکت</li>
                        <li>همه دوره ها</li>
                    </ol>
                </div>
            </div>
        </div>
      </div>
      <Image 
        src={'https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/enamad.png'} 
        alt='ENAMAD' 
        width={150}
        height={150}
      /> 

      <p className='text-center mt-4 pb-3'>کلیه حقوق مادی و معنوی سایت برای سبز لرن محفوظ است. <br/>
      ساخته شده با ❤️ در سبزلرن</p>
    </div>
  );
};

export default Footer;
