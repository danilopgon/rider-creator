import { useEffect, useState } from "react";
import { themeChange } from "theme-change";
import { FiMoon, FiSun } from "react-icons/fi";

const SwitchTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "dracula";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dracula" ? "light" : "dracula";
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
      data-toggle-theme="dracula,light"
      data-act-class="ACTIVECLASS"
    >
      {theme === "dracula" ? (
        <FiSun className="w-5 h-5" />
      ) : (
        <FiMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default SwitchTheme;
