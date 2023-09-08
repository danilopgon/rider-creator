import useRiderCreationContext from "../context/RiderCreationContext";
import RiderCreationForm from "../components/riderCreator/RiderCreationForm";
import StagePlanner from "../components/riderCreator/StagePlanner";
import InstrumentList from "../components/riderCreator/InstrumentList";
import ReviewRider from "../components/riderCreator/ReviewRider";

const RiderCreation = () => {
  const { store, actions } = useRiderCreationContext();
  const { creatorStep, loading } = store;
  const { setCreatorStep } = actions;

  if (loading === true) {
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
          <ul className="steps">
            <li
              className={`step ${creatorStep ? "step-success" : ""}`}
              onClick={() => {
                setCreatorStep(1);
              }}
            ></li>
            <li
              className={`step ${creatorStep >= 2 ? "step-success" : ""}`}
              onClick={() => {
                setCreatorStep(2);
              }}
            ></li>
            <li
              className={`step ${creatorStep >= 3 ? "step-success" : ""}`}
              onClick={() => {
                setCreatorStep(3);
              }}
            ></li>
            <li
              className={`step ${creatorStep === 4 ? "step-success" : ""}`}
              onClick={() => {
                setCreatorStep(4);
              }}
            ></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RiderCreation;
