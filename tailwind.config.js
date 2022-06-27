module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        border: '0 0 1px 1px rgba(255,255,255,0.8)',
      },
      backgroundImage: {},
    },
  },
  variants: {
    // all the following default to ['responsive']
    imageRendering: ['responsive'],
  },
  plugins: [
    require('tailwindcss-image-rendering')(), // no options to configure
  ],
};
