import { Link } from "react-router-dom";

const Home = () => {
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
            <Link to={"/login"} className="btn btn-primary">
              ¡Comienza a crear!
            </Link>
          </div>
        </div>
      </div>
      <div className="container px-5 py-5">
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300 bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content">
            <input type="radio" name="my-accordion-4" checked="checked" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>

          <div className="collapse collapse-arrow join-item border border-base-300 bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content ">
              <p>hello</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
