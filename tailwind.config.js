module.exports = {
	content: ["./pages/**/*.{html,js,tsx}", "./components/**/*.{html,js,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#264653",
				secondary: "#2a9d8f",
				tertiary: "#ffb703",
			},
		},
	},
	plugins: ["tailwindcss", "postcss-preset-env"],
};
