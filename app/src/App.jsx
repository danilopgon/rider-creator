import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { LoginProvider } from "./context/LoginContext";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Login from "./views/Login";
<<<<<<< HEAD
import RiderCreation from "./views/RiderCreation";
=======
import Dashboard from "./views/Dashboard";
>>>>>>> a7c5c23fc54a11ef4c4f8266b8646367245e6750

function App() {
  return (
    <BrowserRouter basename="/">
      <LoginProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
<<<<<<< HEAD
          <Route path="/rider_creation" element={<RiderCreation />} />
=======
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Not Found</h1>}></Route>
>>>>>>> a7c5c23fc54a11ef4c4f8266b8646367245e6750
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
