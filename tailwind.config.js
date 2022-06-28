module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        border: '0 0 1px 1px rgba(255,255,255,0.8)',
      },
      backgroundImage: {
        hero: 'url("assets/images/ui/background.jpg")',
        logo: 'url("assets/images/ui/logo.png")',
      },
      colors: {
        flesh: {
          DEFAULT: '#FFCCAA',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFDFC',
          400: '#FFE4D3',
          500: '#FFCCAA',
          600: '#FFAA72',
          700: '#FF893A',
          800: '#FF6702',
          900: '#C95000',
        },
        'cloud-burst': {
          DEFAULT: '#253156',
          50: '#7185C2',
          100: '#6378BC',
          200: '#4A62AC',
          300: '#3E528F',
          400: '#314173',
          500: '#253156',
          600: '#141B2F',
          700: '#030408',
          800: '#000000',
          900: '#000000',
        },
      },
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
