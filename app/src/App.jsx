import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { LoginProvider } from "./context/LoginContext";
import { AppProvider } from "./context/AppContext";
import NavBar from "./components/NavBar";
import MainToaster from "./components/MainToaster";
import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ResetPassword from "./views/ResetPassword";
import NewPassword from "./views/NewPassword";
import { NotFound } from "./views/NotFound";
import { PageActivation } from "./views/PageActivation";
import RiderCreation from "./views/RiderCreation";
import PrivateRoutes from "./components/PrivateRoutes";
import { CreateBand } from "./views/CreateBand";
import CreateVenue from "./views/CreateVenue";

function App() {
  return (
    <BrowserRouter basename="/">
      <MainToaster />
      <LoginProvider>
        <AppProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/recover-password/:token" element={<NewPassword />} />
            <Route
              path="/activation/:token"
              element={<PageActivation />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
            <Route path="/create-venue" element={<CreateVenue />} />
            {/* pasar a privada  */}
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ridercreation" element={<RiderCreation />} />
              <Route path="/createband" element={<CreateBand />} />
            </Route>
          </Routes>
        </AppProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
