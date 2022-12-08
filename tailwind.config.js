/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          // primary: "#12181F",
          primary: "#12181F",
          "primary-content": "#ffffff",
          "primary-focus": "#12181F",
          accent: "#EDCC5B",
          "accent-content": "#12181F",
          "accent-focus": "#EDCC5B",
        },
      },
    ],
  },
};
