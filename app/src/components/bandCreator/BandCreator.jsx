import useBand from "../../context/BandContext";
import { StepOne } from "./stepOne.jsx";
import { StepTwo } from "./stepTwo.jsx";
import { StepFinal } from "./stepFinal.jsx";

export const BandCreator = ({ children }) => {
  const { storeBand, actionsBand } = useBand();
  const { nameBand, step } = storeBand;
  const { handleCancelledCreateBand, setStep } = actionsBand;

  return (
    <section className="flex justify-center items-center min-h-screen max-w-screen bg-cover bg-no-repeat bg-fixed bg-[url('https://images.pexels.com/photos/811838/pexels-photo-811838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
      <div className="flex flex-col items-center justify-center w-screen h-auto gap-4 p-4 py-8 bg-base-300/50 backdrop-blur-sm">
        <h1 className="text-3xl">
          {step === 1
            ? "Crea tu banda"
            : step === 2
            ? "Agrega Miembros"
            : "Completado!!!"}
        </h1>

        <ul className="steps w-48">
          <li
            className={`step  ${step ? "step-success" : ""}`}
            onClick={() => {
              setStep(1);
            }}
          ></li>
          <li
            className={`step ${step >= 2 ? "step-success" : ""}`}
            onClick={() => {
              setStep(2);
            }}
          ></li>
        </ul>

        <div className="w-[90%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[40%]">
          {step === 1 ? <StepOne /> : step === 2 ? <StepTwo /> : <StepFinal />}
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <form method="dialog" className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">¿Segur@ que quieres cerrar sin guardar?</p>
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-success"
                onClick={handleCancelledCreateBand}
              >
                Aceptar
              </button>
              <button className="btn btn-error">Close</button>
            </div>
          </form>
        </dialog>
      </div>
    </section>
  );
};
