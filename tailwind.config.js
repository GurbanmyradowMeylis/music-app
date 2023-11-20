/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./js/app.js"],
  theme: {
    extend: {
      gradientColorStops: {
        bg1: "rgba(169, 0, 255, 0.62)",
        bg2: "rgba(59, 205, 202, 0.62)",
      },
      backgroundColor: {
        bg: "#A900FF",
      },
    },
  },
  plugins: [],
};
