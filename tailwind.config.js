/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14035F",
        secondary: "#7385CB",
        yellow: "#FBF891",
        primaryBG: "#EBEDF8",
      },
    },
  },
  plugins: [
    function ({ addUtilities })
    {
      const newUtilities = {
        placeholder: {
          color: "#000",
          opacity: "0.5",

        },
        ".placeholder-primary": {
          color: "#14035F",
          opacity: "0.5",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
