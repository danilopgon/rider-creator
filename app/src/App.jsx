import "./App.css";
import SwitchTheme from "./components/SwitchTheme";

function App() {
  return (
    <div className="mockup-phone">
      <div className="camera"></div>
      <div className="display">
        <div className="artboard artboard-demo phone-1">
          <SwitchTheme />
        </div>
      </div>
    </div>
  );
}

export default App;
