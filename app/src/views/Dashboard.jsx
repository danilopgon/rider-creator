import { useState } from "react";

import useLoginContext from "../context/LoginContext";
import RoleSelectionCards from "../components/RoleSelectionCards";
import {RoleMusician} from '../components/RoleMusician'
import {RoleManager} from '../components/RoleManager'
import {RoleTechnician} from '../components/RoleTechnician'

const Dashboard = () => {

  const [isSelect, setIsSelect] = useState(null)
  
  const { store } = useLoginContext();

  console.log(store.venueManagerId)

  if (store.venueManagerId === null && store.technicianID ===null && store.musicianId===null) {
    return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-base-300">
        <h1 className="flex justify-center mt-10 text-4xl font-bold">
          ¿A qué te dedicas?
        </h1>
        <h6 className="flex justify-center mt-4 font-bold text-1xl">
          Selecciona tu rol
        </h6>
        <RoleSelectionCards />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen hero bg-base-100"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="pt-10 m-auto mt-4 rounded shadow-md w-96 bg-base-100">
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src="https://i.pinimg.com/474x/ea/e3/8f/eae38f025c73045f983dd155949f81b1.jpg"
              className="w-40 mx-auto mb-4 rounded-full"
              alt="Fotografia"
            />
            <div className="flex items-center justify-center p-4 my-8 space-x-24 rounded shadow-md bg-base-300">
              <p>Mensajes</p>
              <button type="button" className="w-32 h-8 btn btn-primary">
                Leer
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full p-4 btn-group">
          <button onClick={()=>setIsSelect('musician')} className={`${store.musicianId===1?'btn':'hidden'} ${isSelect==='musician'?'btn-active':''}`}>Musician</button>
          <button onClick={()=>setIsSelect('manager')} className={`${store.venueManagerId===1?'btn':'hidden'} ${isSelect==='manager'?'btn-active':''}`}>Manager</button>
          <button onClick={()=>setIsSelect('technician')} className={`${store.technicianID===1?'btn':'hidden'} ${isSelect==='technician'?'btn-active':''}`}>Technician</button>
        </div>
        {isSelect==='musician'?<RoleMusician/>
        :isSelect==='manager'?<RoleManager/>
        :isSelect==='technician'?<RoleTechnician/>:null}

        
      </div>
    </div>
  );
};

export default Dashboard;
