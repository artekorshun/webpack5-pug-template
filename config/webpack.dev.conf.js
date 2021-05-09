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
	module: {
		rules: [
			// SCSS
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								sourceMap: true,
								config: './postcss.config.js'
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							implementation: require("sass")
						}
					}
				]
			},
			// CSS
			// {
			// 	test: /\.css$/i,
			// 	use: 'css-loader'
			// }
		]
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
