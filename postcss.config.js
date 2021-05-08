module.exports = {
	plugins: [
		require('cssnano')({
			preset: 'default',
		}),
		require('postcss-preset-env')({
			browsers: 'last 5 versions',
		}),
	]
}