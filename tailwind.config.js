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
          // secondary: "#0095f6",
          // "secondary-focus": "#0095f6",
          // accent: "#f68634",
          // "accent-content": "#ffffff",
          // "accent-focus": "#f68634",
          accent: "#FEF08A",
          "accent-content": "#12181F",
          "accent-focus": "#EDCC5B",
        },
      },
    ],
  },
};
