/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1220',
        brand: '#2563EB',
        cyan: { DEFAULT: '#22D3EE' },
        mist: '#F1F5F9',
        ink: '#0F172A',
        muted: '#64748B',
        line: '#E2E8F0',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
