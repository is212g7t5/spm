/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1c5d63",
        },
        secondary: {
          DEFAULT: "#144245",
        },
        tertiary: {
          DEFAULT: "#d1fcff",
        },
        accent1: {
          DEFAULT: "#63391c",
        },
        accent2: {
          DEFAULT: "#c2410c",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

// https://tailwindcss.com/docs/customizing-colors
