module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				border: '0 0 1px 1px rgba(255,255,255,0.8)',
			},
			backgroundImage: {
				button: 'assets/images/ui/button.png',
				'button-hover': 'assets/images/ui/button-hover.png',
				'button-down': 'assets/images/ui/button-down.png',
				'button-golden': 'assets/images/ui/button-golden.png',
				'button-golden-hover': 'assets/images/ui/button-golden-hover.png',
				'button-golden-down': 'assets/images/ui/button-golden-down.png',
				'button-golden-left': 'assets/images/ui/button-golden-left.png',
				'button-golden-right': 'assets/images/ui/button-golden-right.png',
			},
			backgroundSize: {
				'100%_100%': '100% 100%',
				'100%_70%': '100% 70%',
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
