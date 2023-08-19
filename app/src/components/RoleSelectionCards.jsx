import useAppContext from "../context/AppContext";

const RoleSelectionCards = () => {
  const { actions, store } = useAppContext();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 my-5 p-3">
        <div className="card join-item bg-base-100 shadow-xl  mb-4 max-w-md min-w-sm flex-1  animate-fade-up animate-once animate-ease-in-out">
          <figure className="w-full">
            <img
              src="https://images.pexels.com/photos/12327601/pexels-photo-12327601.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Músico"
              className="object-cover object-top aspect-square"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Músico</h2>
            <p className="my-3">
              ¡Es hora de hacer música! Quiero crear un rider para mi banda
            </p>
            <div className="justify-end card-actions">
              <button
                onClick={() => actions.handleRoleSelection("musician")}
                className="btn btn-primary"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>

        <div className="card join-item bg-base-100 shadow-xl  mb-4 max-w-md min-w-sm flex-1  animate-fade-up animate-once animate-delay-100 animate-ease-in-out">
          <figure className="w-full">
            <img
              src="https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Promotor"
              className="object-cover object-top aspect-square"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Promotor</h2>
            <p className="my-3">Quiero organizar conciertos en mi sala</p>
            <div className="justify-end card-actions">
              <button
                onClick={() => actions.handleRoleSelection("manager")}
                className="btn btn-primary"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>

        <div className="card join-item bg-base-100 shadow-xl  mb-4 max-w-md min-w-sm flex-1  animate-fade-up animate-once animate-delay-200 animate-ease-in-out">
          <figure className="w-full">
            <img
              src="https://images.pexels.com/photos/4988133/pexels-photo-4988133.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Técnico"
              className="object-cover object-top aspect-square"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Técnico</h2>
            <p className="my-3">
              Quiero ofrecer mis servicios como profesional de sonido
            </p>
            <div className="justify-end card-actions">
              <button
                onClick={() => actions.handleRoleSelection("technician")}
                className="btn btn-primary"
              >
                Registrarme
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mb-10">
        {store.selectedRole && (
          <button
            className="btn btn-primary w-2/3 md:w-2/5"
            onClick={actions.handleRoleSubmit}
          >
            {`Confirmo que quiero continuar como ${actions.roleTranslation()}`}
          </button>
        )}
      </div>
    </>
  );
};

export default RoleSelectionCards;
