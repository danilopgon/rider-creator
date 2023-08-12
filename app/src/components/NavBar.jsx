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
        <div className="justify-center hidden md:flex">
          <ul className="px-1 menu menu-horizontal">
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
      <div className="justify-center navbar-center">
        <div className="flex justify-center md:hidden">
          <ul className="px-1 text-lg menu menu-horizontal">
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
