/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0F1E",
        panel: "#131B2E",
        panel2: "#1A2338",
        line: "#242F49",
        cyan: {
          DEFAULT: "#5EEAD4",
          soft: "#5EEAD433",
        },
        violet: {
          DEFAULT: "#A78BFA",
          soft: "#A78BFA33",
        },
        amber: {
          DEFAULT: "#FFB454",
          soft: "#FFB45433",
        },
        ink: "#EAF0FB",
        muted: "#8B96AC",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(#242F4922 1px, transparent 1px), linear-gradient(90deg, #242F4922 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "36px 36px",
      },
    },
  },
  plugins: [],
};
