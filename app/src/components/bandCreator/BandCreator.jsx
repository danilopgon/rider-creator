import  useBand  from "../../context/BandContext";
import { StepOne } from "./stepOne.jsx";
import { StepTwo } from "./stepTwo.jsx";
import { StepFinal } from "./stepFinal.jsx";

export const BandCreator = ({children}) => {
  
  
  const { store, actions } = useBand();
  const{nameBand, step} = store;
  const { handleInputNameBand, handleOnsubmitBandName, setStep } = actions;

 

  console.log(step)
  console.log(nameBand)

  return (
    
    <section className="w-screen h-auto lg:w-[90%] flex flex-col items-center gap-4 p-4">
      <h1 className="text-3xl">
        {step === 1
          ? "Crea tu banda"
          : step === 2
          ? "Agrega Miembros"
          : "Completado!!!"}
      </h1>
      <div className="lg:w-[30%] md:w-[40%] w-[40%] md:w-[70%]  flex justify-between">
        <button
          onClick={() => setStep(1)}
          className={`flex items-center justify-center w-8 h-8 p-0 text-3xl text-black rounded-full md:w-16 md:h-16 ${
            step === 1 ? "bg-slate-300" : "bg-green-400"
          } fw-bold `}
        >
          1
        </button>
        <div className="border w-[20%] md:w-[50%] h-0 flex my-auto"></div>
        <button
          onClick={() => setStep(2)}
          className={`flex items-center justify-center w-8 h-8 p-0 text-3xl text-black rounded-full md:w-16 md:h-16 ${
            step === 2 || step === 1 ? "bg-slate-300" : "bg-green-400"
          } fw-bold `}
        >
          2
        </button>
      </div>
      {step === 1 ? <StepOne/> : step === 2 ? <StepTwo/> : <StepFinal />}
    </section>
  );
};
