const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	module: {
		rules: [
			// SCSS
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: './postcss.config.js'
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require("sass")
						}
					}
				]
			},
			// CSS
			// {
			// 	test: /\.css$/i,
			// 	use: MiniCssExtractPlugin.loader
			// }
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${baseWebpackConfig.externals.paths.assets}css/[name].[contenthash].css`
		})
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
})