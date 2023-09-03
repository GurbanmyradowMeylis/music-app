/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      gradientColorStops: {
        angle: "180deg",
        bg1: "#A900FF",
        bg2: " #3BCDCA",
      },
      backgroundColor: {
        bg: "#A900FF",
      },
    },
  },
  plugins: [],
};
