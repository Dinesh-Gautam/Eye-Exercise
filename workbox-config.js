module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{css,mp3,png,jpg,html,js,txt,json}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js'
};