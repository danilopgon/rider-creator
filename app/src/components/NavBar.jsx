import SwitchTheme from "./SwitchTheme";
import { Link } from "react-router-dom";
import { FiLogIn, FiHome } from "react-icons/fi";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="hidden md:flex justify-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/rider_creation"}>RiderCreation</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center justify-center">
        <div className="flex justify-center md:hidden">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li>
              <Link to={"/"}>
                <FiHome />
              </Link>
            </li>
            <li>
              <Link to={"/login"}>
                <FiLogIn />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <SwitchTheme />
      </div>
    </div>
  );
};

export default NavBar;
