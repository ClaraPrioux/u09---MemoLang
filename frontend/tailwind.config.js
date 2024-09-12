/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(to top right, #2448AA 0%, #008BDB 25%, #6BFBCE 75%, #00C6DE 100%)",
      },
    },
  },
  plugins: [],
};
