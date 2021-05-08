const path = require('path')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
							esModule: false,
							publicPath: '../'
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
			{
				test: /\.css$/i,
				use: MiniCssExtractPlugin.loader
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${baseWebpackConfig.externals.paths.assets}css/[name].[contenthash].css`
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${baseWebpackConfig.externals.paths.src}/assets/img`, to: `${baseWebpackConfig.externals.paths.assets}img` },
				{ from: `${baseWebpackConfig.externals.paths.src}/static`, to: '' }
			]
		})
	]
})

module.exports = new Promise((resolve, reject) => {
	resolve(buildWebpackConfig)
})