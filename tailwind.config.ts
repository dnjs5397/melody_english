import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream:    '#FDFCF8',
        apricot:  '#FFC8A2',
        mint:     '#B8E0D2',
        lavender: '#E2D1F9',
        charcoal: '#4A4A4A',
        sand:     '#E8E4DD',
        navy: {
          950: '#0a1f44',
          900: '#0f2752',
          800: '#1a3a6e',
          700: '#1e4d8c',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-kr)', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
