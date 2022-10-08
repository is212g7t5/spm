/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#1c5d63",
        secondaryColor: "#003841",
        tertiaryColor: "#002123",
        callToActionColor1: "#ff5a01",
        callToActionColor2: "#c2410c",
        callToActionColor3: "#ff9400",
        backgroundColor: "#D9D9D9", 
        dimBackgroundColor: "#111827",
        textColor: "#FFFFFF",
        textColor2: "#F3F4F6"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
