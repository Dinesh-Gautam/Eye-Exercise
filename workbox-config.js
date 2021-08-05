module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{mp3,html,json,js,scss,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'src/sw.js'
};