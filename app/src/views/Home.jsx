import { Link } from "react-router-dom";
import useLoginContext from "../context/LoginContext";
import toast from "react-hot-toast";

const Home = () => {
  const { actions, store } = useLoginContext();

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            {store.loggedIn ? (
              <Link to={"/dashboard"} className="btn btn-primary">
                ¡Comienza a crear!
              </Link>
            ) : (
              <Link to={"/login"} className="btn btn-primary">
                ¡Comienza a crear!
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
