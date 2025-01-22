import NavbarSearch from "../navbara-search/search";
import ProfileNavbar from "./basket/Basket";
import BasketNavbar from "./profile/Profile";


const Navbarfeature = () => {
  return (
    <div className="d-flex gap-4 ">
      <NavbarSearch />
      <BasketNavbar /> 
      <ProfileNavbar />
    </div>
  );
};

export default Navbarfeature;
