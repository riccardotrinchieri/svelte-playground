/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		nightwind: {
			colorClasses: ['ring', 'ring-offset', 'divide', 'placeholder']
		},
		extend: {}
	},
	plugins: [require('nightwind')]
};
