/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF385C",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
  darkMode: "class",
};
