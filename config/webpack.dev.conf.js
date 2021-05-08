const webpack = require('webpack')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')

const devWebpackConfig = merge([baseWebpackConfig, {
	mode: 'development',
	devServer: {
		contentBase: baseWebpackConfig.externals.paths.dist,
		port: 8081,
		overlay: {
			warnings: false,
			errors: true
		},
		open: 'Chrome'
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: '[file].map'
		})
	]
}])

module.exports = new Promise((resolve, reject) => {
	resolve(devWebpackConfig)
})
