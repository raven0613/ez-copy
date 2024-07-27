/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      // Using modern `rgb`
      primary: "#222831",
      secondary: "#31363F",
      accent: "#76ABAE",
      light: "#EEEEEE",
      primary: {
        50: "#f6f7f9",
        100: "#eceff2",
        200: "#d4dbe3",
        300: "#aebccb",
        400: "#8297ae",
        500: "#637b94",
        600: "#4e637b",
        700: "#405064",
        800: "#384454",
        900: "#323c48",
        950: "#222831",
      },
      secondary: {
        50: "#f6f7f9",
        100: "#edeef1",
        200: "#d6dae1",
        300: "#b3bbc6",
        400: "#8996a7",
        500: "#6a788d",
        600: "#556074",
        700: "#464f5e",
        800: "#3c4350",
        900: "#31363f",
        950: "#23272e",
      },
      accent: {
        50: "#f3f8f8",
        100: "#dfedee",
        200: "#c3ddde",
        300: "#9ac4c6",
        400: "#76abae",
        500: "#4e888c",
        600: "#447176",
        700: "#3c5d62",
        800: "#374e53",
        900: "#314448",
        950: "#1d2b2f",
      },
    },
  },
  plugins: [],
};
