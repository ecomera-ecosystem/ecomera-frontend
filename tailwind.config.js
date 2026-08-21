/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2A4BFF',
          light: '#5B72FF',
          dark: '#1D3ADB',
          soft: '#EEF1FF',
        },
        ink: {
          DEFAULT: '#1E1E1E',
          soft: '#333333',
        },
        surface: {
          DEFAULT: '#F0EEEF',
          alt: '#EDEDED',
          card: '#FFFFFF',
        },
        panel: {
          DEFAULT: '#292D33',
          light: '#3A4048',
        },
        line: {
          DEFAULT: '#E3E3E3',
          strong: '#D9D9D9',
        },
        placeholder: {
          DEFAULT: '#B4B4B4',
          soft: '#D9D9D9',
        },
        success: '#34C759',
        mapblue: '#4285F4',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(30, 30, 30, 0.06), 0 4px 14px rgba(30, 30, 30, 0.06)',
        lift: '0 6px 18px rgba(30, 30, 30, 0.12), 0 12px 32px rgba(30, 30, 30, 0.10)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
