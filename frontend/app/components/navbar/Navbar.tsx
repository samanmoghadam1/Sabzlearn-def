import Image from "next/image";
import HamburgerButton from "./Hamburger-button/HamburgerButton";
import Navbarfeature from "./Navbarfeature/Navbarfeature";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-100 bg-white pt-3 pb-3">
      <div
        style={{ width: "90%" }}
        className="d-flex m-auto justify-content-between"
      >
        <HamburgerButton />
        <Link href={"/"}>
          <Image
            src={
              "https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/logo.webp"
            }
            alt="sabz learn academy"
            width={73}
            height={48}
          />
        </Link>
        <Navbarfeature />
      </div>
    </nav>
  );
};

export default Navbar;
