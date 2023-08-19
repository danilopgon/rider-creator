import useRiderCreationContext from "../context/RiderCreationContext";
import RiderCreationForm from "../components/riderCreator/RiderCreationForm";
import StagePlanner from "../components/riderCreator/StagePlanner";
import InstrumentList from "../components/riderCreator/InstrumentList";
import ReviewRider from "../components/riderCreator/ReviewRider";

const RiderCreation = () => {
  const { store, actions } = useRiderCreationContext();
  const { creatorStep, isLoading } = store;
  const { setCreatorStep } = actions;

  if (isLoading === true) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
        <div
          className={` flex justify-center  xl:w-4/7 md:mx-10 backdrop-blur-md bg-base-200/50 p-5 rounded-lg my-10`}
        >
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen max-w-screen bg-cover bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div
        className={`w-full  ${
          creatorStep === 2 || creatorStep === 4 ? "xl:w-4/7" : "xl:max-w-lg"
        } md:mx-10 backdrop-blur-md bg-base-200/50 p-5 rounded-lg my-10`}
      >
        <h1 className="text-center my-4 text-3xl font-bold text-base-content ">
          {creatorStep === 1 && "¿Dónde tocamos?"}
          {creatorStep === 2 && "Planifica el escenario"}
          {creatorStep === 3 && "Ordena las entradas"}
          {creatorStep === 4 && "¿Está todo correcto?"}
        </h1>
        {creatorStep === 1 && <RiderCreationForm />}
        {creatorStep === 2 && <StagePlanner />}
        {creatorStep === 3 && <InstrumentList />}
        {creatorStep === 4 && <ReviewRider />}

        <div className="flex justify-center my-5">
          <div className="join">
            <button
              className={`join-item btn btn-primary ${
                creatorStep === 1 ? "btn-active" : ""
              }`}
              onClick={() => {
                setCreatorStep(1);
              }}
            >
              1
            </button>
            <button
              className={`join-item btn btn-primary ${
                creatorStep === 2 ? "btn-active" : ""
              }`}
              onClick={() => {
                setCreatorStep(2);
              }}
            >
              2
            </button>
            <button
              className={`join-item btn btn-primary ${
                creatorStep === 3 ? "btn-active" : ""
              }`}
              onClick={() => {
                setCreatorStep(3);
              }}
            >
              3
            </button>
            <button
              className={`join-item btn btn-primary ${
                creatorStep === 4 ? "btn-active" : ""
              }`}
              onClick={() => {
                setCreatorStep(4);
              }}
            >
              4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderCreation;
