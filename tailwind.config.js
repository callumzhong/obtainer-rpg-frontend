module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				border: '0 0 1px 1px rgba(255,255,255,0.8)',
			},
			colors: {
				karry: {
					DEFAULT: '#FFE8D2',
					50: '#FFFFFF',
					100: '#FFFFFF',
					200: '#FFFFFF',
					300: '#FFFFFF',
					400: '#FFFDFB',
					500: '#FFE8D2',
					600: '#FFCB9A',
					700: '#FFAF62',
					800: '#FF922A',
					900: '#F17600',
				},
				sandal: {
					DEFAULT: '#A48465',
					50: '#E8E0D8',
					100: '#E1D6CC',
					200: '#D1C1B2',
					300: '#C2AD98',
					400: '#B3987F',
					500: '#A48465',
					600: '#83684E',
					700: '#604C39',
					800: '#3D3024',
					900: '#1A140F',
				},
				paco: {
					DEFAULT: '#3A160D',
					50: '#D04F2F',
					100: '#BF492B',
					200: '#9E3C23',
					300: '#7D2F1C',
					400: '#5B2314',
					500: '#3A160D',
					600: '#0C0503',
					700: '#000000',
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
