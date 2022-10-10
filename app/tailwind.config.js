/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#1c5d63",
        secondary: "#003841",
        tertiary: "#002123",
        accent1: "#ff5a01",
        accent2: "#c2410c",
        accent3: "#ff9400",
        background: "#D9D9D9",
        dimBackgroundColor: "#111827",
        textColor: "#FFFFFF",
        textColor2: "#F3F4F6"
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

// https://tailwindcss.com/docs/customizing-colors
