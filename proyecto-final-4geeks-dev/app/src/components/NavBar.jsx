import SwitchTheme from "./SwitchTheme";
import { Link } from "react-router-dom";
import { FiLogIn, FiHome } from "react-icons/fi";
import { ImExit } from "react-icons/im";
import useLoginContext from "../context/LoginContext";

const NavBar = () => {
  const { store, actions } = useLoginContext();

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="hidden md:flex justify-center">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
            <li>
              {store.loggedIn ? (
                <Link onClick={actions.handleLogout}>Logout</Link>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
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
              {store.loggedIn ? (
                <Link onClick={actions.handleLogout}>
                  <ImExit />
                </Link>
              ) : (
                <Link to={"/login"}>
                  <FiLogIn />
                </Link>
              )}
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
