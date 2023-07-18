import React, {useState} from "react";

const RoleSelection = ({onSubmit}) => {

    const [selectedRole, setSelectedRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedRole){
            onSubmit(selectedRole);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <div>
                <h2>Elige tu rol:</h2>
                <div>
                  <input 
                    type="radio"
                    id="musician"
                    value="Músico"
                    checked= {selectedRole === "Músico"}
                    onChange={setSelectedRole("Músico")}
                    />
                    <label htmlFor="musician">Músico</label>
                </div>
                <div>
                  <input 
                    type="radio"
                    id="technician"
                    value="Técnico"
                    checked= {selectedRole === "Técnico"}
                    onChange={setSelectedRole("Técnico")}
                    />
                    <label htmlFor="technician">Técnico</label>
                </div>
                <div>
                  <input 
                    type="radio"
                    id="promoter"
                    value="Músico"
                    checked= {selectedRole === "Promotor"}
                    onChange={setSelectedRole("Promotor")}
                    />
                    <label htmlFor="promoter">Promotor</label>
                </div>
            </div>
        </form>
    )
}

export default RoleSelection;