const Dashboard = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="w-96 m-auto shadow-md rounded bg-white pt-10 mt-4">
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/474x/ea/e3/8f/eae38f025c73045f983dd155949f81b1.jpg"
              className="rounded-full w-40 mx-auto mb-4"
              alt="Fotografia"
            />
            <div className="flex justify-center items-center space-x-24 my-8 shadow-md rounded bg-white p-2">
              <p>Mensajes</p>
              <button type="button" className="rounded-md bg-violet-700 h-8 w-32 text-white">Leer</button>
            </div>
          </div>
        </div>
        <div class="container mx-auto px-4 shadow-md">
          <h1 className="text-4xl font-bold mb-6 flex justify-center">Tu Rider</h1>
          <form class="bg-white px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="lugar">
                Lugar
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lugar"
                type="text"
                placeholder="Hotel Sur"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="sala">
                Sala
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="sala"
                type="text"
                placeholder="Sala el Perro"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="tecnico">
                Técnico
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tectnico"
                type="text"
                placeholder="Busca técnico"
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                class="rounded-md bg-violet-700 h-10 w-96 text-white mb-4 mt-4"
                type="button"
              >
                Buscar técnico
              </button>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="rounded-md bg-violet-700 h-10 w-96 text-white"
                type="button"
              >
                Editar
              </button>
            </div>
          </form>
        </div>
        <div class="container mx-auto px-12 py-2 flex justify-center">
          <button
            class="rounded-md bg-violet-700 h-10 w-80 text-white"
            type="button"
          >
            Comienza a crear
          </button>
        </div>
      <div class="container mx-auto px-4 shadow-md mt-4">
          <h1 className="text-4xl font-bold mb-6 flex justify-center">Tus Grupos</h1>
          <form class="bg-white px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="lugar">
                Lugar
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lugar"
                type="text"
                placeholder="Hotel Sur"
              />
            </div>
            <div class="flex items-center justify-between mb-4">
              <button
                class="rounded-md bg-violet-700 h-10 w-96 text-white"
                type="button"
              >
                Editar
              </button>
            </div>
            <div class="flex items-center justify-between">
              <button
                class="rounded-md bg-violet-700 h-10 w-96 text-white"
                type="button"
              >
                Añadir
              </button>
            </div>
          </form>
          </div>
          </div>
    </div>
  );
};

export default Dashboard;
