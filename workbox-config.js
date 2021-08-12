module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{mp3,png,jpg,html,js,txt,css,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js'
};