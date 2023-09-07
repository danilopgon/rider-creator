import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { FiMoon, FiSun } from "react-icons/fi";

const SwitchTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "forest";
  });

  const toggleTheme = () => {
    const newTheme = theme === "forest" ? "cupcake" : "forest";
    setTheme(newTheme);
    const themeEvent = new CustomEvent("themechange", {
      detail: { theme: newTheme },
    });
    window.dispatchEvent(themeEvent);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <button
      className="btn btn-circle"
      onClick={toggleTheme}
      data-toggle-theme="forest,cupcake"
      data-act-class="ACTIVECLASS"
    >
      {theme === "forest" ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default SwitchTheme;
