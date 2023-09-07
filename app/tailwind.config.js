/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [
    require("daisyui"),
    require("tailwindcss-animated"),
    require("tailwind-scrollbar"),
  ],
  daisyui: {
    themes: [
      "light",
      {
        dracula: {
          ...require("daisyui/src/theming/themes")["[data-theme=dracula]"],
          primary: "#4822d5",
        },
      },
    ],
  },
};
