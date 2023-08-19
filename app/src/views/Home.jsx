import { Link } from "react-router-dom";
import useLoginContext from "../context/LoginContext";

const Home = () => {
  const { store } = useLoginContext();

  return (
    <main className="flex flex-col justify-center items-center">
      <header
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold ">
              Es hora de hacer música
            </h1>
            <p className="mb-5">
              Crea un rider para tu banda y compártelo con las salas de
              conciertos y técnicos de tu ciudad. ¡Es gratis!
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
      </header>

      <section className="container flex flex-col justify-center items-center my-7 p-5">
        <h2 className="text-2xl font-bold mb-5">Preguntas frecuentes</h2>
        <div className="join join-vertical w-full max-w-4xl">
          <div className="collapse collapse-arrow join-item border-2 border-primary-content bg-primary text-primary-content">
            <input type="radio" name="my-accordion-2" checked="checked" />
            <div className="collapse-title text-xl font-medium">
              ¿Qué es un rider de conciertos?
            </div>
            <div className="collapse-content">
              <p>
                Un rider de conciertos es un documento que describe las
                necesidades técnicas y logísticas de una banda o artista para un
                concierto. Incluye información sobre el equipo necesario, los
                requisitos de sonido y iluminación, y cualquier otra necesidad
                específica de la banda.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-2 border-primary-content bg-primary text-primary-content">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              ¿Por qué debería crear un rider de conciertos?
            </div>
            <div className="collapse-content">
              <p>
                Crear un rider de conciertos puede ayudar a asegurarte de que
                tus necesidades técnicas y logísticas se cumplan en un
                concierto. También puede ayudar a los técnicos de sonido e
                iluminación a prepararse para el concierto y asegurarse de que
                todo esté listo para tu actuación.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-2 border-primary-content bg-primary text-primary-content">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              ¿Cómo puedo compartir mi rider de conciertos con las salas de
              conciertos y técnicos?
            </div>
            <div className="collapse-content">
              <p>
                Puedes compartir tu rider de conciertos con las salas de
                conciertos y técnicos a través de nuestro sitio web. Simplemente
                crea una cuenta, crea tu rider y compártelo con las personas que
                necesiten verlo.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-2 border-primary-content bg-primary text-primary-content">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium">
              ¿Es gratis crear y compartir un rider de conciertos?
            </div>
            <div className="collapse-content">
              <p>
                Sí, crear y compartir un rider de conciertos es completamente
                gratis en nuestro sitio web. No hay cargos ocultos ni tarifas
                por el uso de nuestro servicio.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center w-full   bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
        <div className="flex flex-row py-10 justify-center items-centerbg-base-200/50 backdrop-blur-sm w-full h-full">
          <div>
            <img
              className="flex md:hidden "
              src="/612shots_so.png"
              alt="Smartphone mockup"
            />
            <img
              className="hidden md:flex"
              src="/326shots_so.png"
              alt="Desktop mockup"
            />
          </div>
        </div>
      </section>
      <footer className="footer footer-center p-10 bg-primary text-primary-content">
        <div>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
            <path d="M13.13 22.19l-1.63-3.83c1.57-.58 3.04-1.36 4.4-2.27l-2.77 6.1M5.64 12.5l-3.83-1.63 6.1-2.77C7 9.46 6.22 10.93 5.64 12.5M19.22 4c.28 0 .53 0 .74.05.17 1.39-.02 4.25-3.3 7.53-1.7 1.71-3.73 3.02-6.01 3.89l-2.15-2.1c.92-2.31 2.23-4.34 3.92-6.03C15.18 4.58 17.64 4 19.22 4m0-2c-1.98 0-4.98.69-8.22 3.93-2.19 2.19-3.5 4.6-4.35 6.71-.28.75-.09 1.57.46 2.13l2.13 2.12c.38.38.89.61 1.42.61.23 0 .47-.06.7-.15A19.1 19.1 0 0018.07 13c5.66-5.66 3.54-10.61 3.54-10.61S20.7 2 19.22 2m-4.68 7.46c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0c.77.78.78 2.05 0 2.83-.78.78-2.05.78-2.83 0m-5.66 7.07l-1.41-1.41 1.41 1.41M6.24 22l3.64-3.64c-.34-.09-.67-.24-.97-.45L4.83 22h1.41M2 22h1.41l4.77-4.76-1.42-1.41L2 20.59V22m0-2.83l4.09-4.08c-.21-.3-.36-.62-.45-.97L2 17.76v1.41z" />
          </svg>
          <p className="font-bold">
            Proyecto Final para 4Geeks <br />
            Rider Creator
          </p>
          <p>michelcub | danilopgon | RofinhoOo </p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
