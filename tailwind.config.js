import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        surface: 'var(--bg2)',
        surfaceHover: 'var(--bg3)',
        border: 'var(--border)',
        borderHover: 'var(--border2)',
        text1: 'var(--text1)',
        text2: 'var(--text2)',
        text3: 'var(--text3)',
        accent: 'var(--accent)',
        gold: 'var(--gold)',
        gold2: 'var(--gold2)',
        green: 'var(--green)',
        blue: 'var(--blue)',
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif'],
        serif: ['"Noto Serif KR"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config;
