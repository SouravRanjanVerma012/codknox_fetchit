/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        'sk-rotatePlane': {
          '0%': { transform: 'perspective(120px) rotateX(0) rotateY(0)' },
          '50%': { transform: 'perspective(120px) rotateX(-180.1deg) rotateY(0)' },
          '100%': { transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)' },
        }
      },
      animation: {
        'sk-rotatePlane': 'sk-rotatePlane 1.2s ease-in-out infinite',
      },
      fontFamily: {
        admin: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        adminHeading: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      }
    },
  },
  plugins: [],
}
