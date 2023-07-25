import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { LoginProvider } from "./context/LoginContext";
import { AppProvider } from "./context/AppContext";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import ResetPassword from "./views/ResetPassword";
import NewPassword from "./views/NewPassword";

function App() {
  return (
    <BrowserRouter basename="/">
      <LoginProvider>
        <AppProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="recover-password/:token" element={<NewPassword />} />
            <Route
<<<<<<< Updated upstream
              path="api/auth/recover-password/:token"
              element={<NewPassword />}
            />
            <Route path="*" element={<h1>Not Found</h1>}></Route>
=======
              path="/activation/:token"
              element={<PageActivation />}
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
>>>>>>> Stashed changes
          </Routes>
        </AppProvider>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
