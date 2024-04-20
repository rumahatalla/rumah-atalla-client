/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ["helvetica", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        primaryDark: "#0F172A",
        primaryNormal: "#0F172A",
        primaryThin: "#272F40",
        primaryVeryThin: "#272F40",
        secondaryDark: "#509bec",
        secondary: "#509bec",
        thirdyNormal: "#E2F0FF",
        thirdyThin: "#f7f9fd",
      },
    },
  },
  plugins: [],
};