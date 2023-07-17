import React from "react";
import "../styles/RiderCreationStyles.css";

const RiderCreation = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-4">Crea tu rider</h1>
                    <div className="card">
                        <div className="card-body">
                            <form className="d-flex flex-column">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputText" className="form-label">Selecciona tu banda</label>
                                    <input type="text" className="form-control" id="exampleInputText" aria-describedby="Select your band" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputText2" className="form-label">¿En qué sala?</label>
                                    <input type="text" className="form-control" id="exampleInputText2" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputDate" className="form-label">Fecha</label>
                                    <input type="date" className="form-control" id="exampleInputDate" />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">¡Comienza a crear!</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RiderCreation;
