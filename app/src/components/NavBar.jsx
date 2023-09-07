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
        <Link to={localStorage.getItem("jwt-token") ? "/dashboard" : "/"}>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">
              🎹 Rider Creator
            </a>
          </div>
        </Link>
      </div>
      <div className="justify-center navbar-center">
        <div className="justify-center hidden md:flex">
          <ul className="px-1 menu menu-horizontal">
            <li>
              <Link to={localStorage.getItem("jwt-token") ? "/dashboard" : "/"}>
                {localStorage.getItem("jwt-token")
                  ? "Área de usuario"
                  : "Inicio"}
              </Link>
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
        <div className="flex justify-center md:hidden">
          <ul className="px-1 text-lg menu menu-horizontal">
            <li>
              <Link to={localStorage.getItem("jwt-token") ? "/dashboard" : "/"}>
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
