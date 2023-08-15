import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

import "./App.css";
import { LoginProvider } from "./context/LoginContext";
import { AppProvider } from "./context/AppContext";
import { RiderCreationProvider } from "./context/RiderCreationContext";
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
  const backend = window.innerWidth <= 768 ? TouchBackend : HTML5Backend;
  const options = { enableMouseEvents: true };

  return (
    <BrowserRouter basename="/">
      <MainToaster />
      <DndProvider backend={backend} options={options}>
        <LoginProvider>
          <AppProvider>
            <RiderCreationProvider>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/recover-password/:token"
                  element={<NewPassword />}
                />
                <Route
                  path="/activation/:token"
                  element={<PageActivation />}
                ></Route>
                {/* <Route path="test-drag" element={<StagePlanner />} /> */}
                <Route path="*" element={<NotFound />}></Route>
                <Route element={<PrivateRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/create-rider" element={<RiderCreation />} />
                  <Route path="/create-band" element={<CreateBand />} />
                  <Route path="/create-venue" element={<CreateVenue />} />
                </Route>
              </Routes>
            </RiderCreationProvider>
          </AppProvider>
        </LoginProvider>
      </DndProvider>
    </BrowserRouter>
  );
}

export default App;
