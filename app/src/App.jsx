import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { LoginProvider } from "./context/LoginContext";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import RiderCreation from "./views/RiderCreation";

function App() {
  return (
    <BrowserRouter basename="/">
      <LoginProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ridercreation" element={<RiderCreation />} />
          <Route path="*" element={<h1>Not Found</h1>}></Route>
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
