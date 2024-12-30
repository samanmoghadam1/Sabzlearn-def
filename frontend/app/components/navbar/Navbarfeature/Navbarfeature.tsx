import ProfileNavbar from "./basket/Basket";
import BasketNavbar from "./profile/Profile";


const Navbarfeature = () => {
  return (
    <div className="d-flex gap-4 ">
      <BasketNavbar /> 
      <ProfileNavbar />
    </div>
  );
};

export default Navbarfeature;
