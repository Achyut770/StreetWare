import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "mainColor": "var(--mainColor)",
        "primaryColor": "rbga(var(--primaryColor))",
        "bgHoverButton": "var(--bg-hover-button)",
        "bgActiveButton": "var(--bg-active-button)",
        "bgInput": "var(--bg-input)",
        "blueMain": "var(--blueMainColor)",
        "redMain": "var(--redMainColor)",
        'toggle-light': '#ebebeb',
        'toggle-dark': '#242424',
        'toggle-thumb-light': 'linear-gradient(180deg, #ffcc89, #d8860b)',
        'toggle-thumb-dark': 'linear-gradient(180deg, #777, #3a3a3a)',
      },
      boxShadow: {
        "product": 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        "bookmark": 'rgba(50, 50, 93, 0.25) 0px 6px 12px - 2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
        "testimonal": "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        "navbar": "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        'toggle-thumb': '0px 5px 10px rgba(0, 0, 0, 0.2)',

      },
      spacing: {
        'toggle-width': '65px',
        'toggle-height': '30px',
        'thumb-width': '25px',
        'thumb-height': '25px',
      },
    },
  },
  plugins: [],
};

export default config;
