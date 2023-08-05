import Lottie from "lottie-react";
import check from "../assets/animations/UYite2OzKA.json";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useLoginContext from "../context/LoginContext";


export const PageActivation = () => {
  const { token } = useParams();

  const [counter, setCounter] = useState(5);
  const { actions } = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
    actions.handleActiveAccount(token);
  }, [actions, token]);

  useEffect(() => {
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/login");
    }
  }, [counter, navigate]);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <h1 className="mt-5 text-4xl font-bold text-center text-white">
        Your account is activated
      </h1>
      <div className='w-[50%] h-auto'>
        <Lottie animationData={check}/>
      </div>
      
      <h3 className="text-xl text-center">
        Sera redirigido para iniciar sesion en:
      </h3>
      <h2>{counter} segundos</h2>
    </div>
  );
};
