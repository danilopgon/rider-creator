const RoleSelectionCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5 p-3">
    <div className="card join-item bg-base-100 shadow-xl p-4 mb-4">
        <figure>
          <img
            src="https://images.pexels.com/photos/12327601/pexels-photo-12327601.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Músico"
            className="aspect-square object-cover object-top"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Músico</h2>
          <p>¡Es hora de hacer música! Quiero crear un rider para mi banda</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Registrarme</button>
          </div>
        </div>
      </div>
      <div className="card join-item bg-base-100 shadow-xl p-4 mb-4">
        <figure>
          <img
            src="https://images.pexels.com/photos/1666816/pexels-photo-1666816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Promotor"
            className="aspect-square object-cover object-top"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Promotor</h2>
          <p>Quiero organizar conciertos en mi sala</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Registrarmse</button>
          </div>
        </div>
      </div>
      <div className="card join-item bg-base-100 shadow-xl p-4 mb-4">
        <figure>
          <img
            src="https://images.pexels.com/photos/4988133/pexels-photo-4988133.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Técnico"
            className="aspect-square object-cover object-top"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Técnico</h2>
          <p>Quiero ofrecer mis servicios como profesional de sonido</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Registrarme</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionCards;
