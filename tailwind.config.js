/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        'xl': '30px',
      },
      boxShadow: {
        'visionos': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      },
      borderRadius: {
        'visionos': '24px',
      },
      backgroundOpacity: {
        '15': '0.15',
      }
    },
  },
  plugins: [],
}

