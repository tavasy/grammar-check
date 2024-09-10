// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // paths to your files
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Register 'Inter' font family
      },
      colors: {
        customPurple: '#574378',
        customLightPurple: '#6a538f',
      },
    },
  },
  plugins: [],
};
