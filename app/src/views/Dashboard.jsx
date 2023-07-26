const Dashboard = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="text-center">
        <img
          src="https://i.pinimg.com/474x/ea/e3/8f/eae38f025c73045f983dd155949f81b1.jpg"
          className="rounded-full w-40 mx-auto mb-4"
          alt="Fotografia"
        />
        <div className="flex">
        <p>Mensajes</p>
        <button type="button" className="btn btn-primary">Leer</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
