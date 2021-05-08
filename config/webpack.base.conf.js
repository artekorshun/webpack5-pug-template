const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

module.exports = {
	target: 'web',
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src
	},
	output: {
		filename: `${PATHS.assets}js/[name].[contenthash].js`,
		path: PATHS.dist,
		publicPath: '/'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			// JavaScript
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { targets: "defaults" }]
						]
					}
				}
			},
			// Изображения
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[name].[ext]'
					}
				}
			},
			// SCSS
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
							publicPath: '../'
						}
					},
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
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	resolve: {
		alias: {
			'~': PATHS.src, // Example: import Dog from "~/assets/img/dog.jpg"
			'@': `${PATHS.src}/js`, // Example: import Sort from "@/utils/sort.js"
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[contenthash].css`
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/assets/img`, to: `${PATHS.assets}img` },
				{ from: `${PATHS.src}/static`, to: '' }
			]
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			title: 'Webpack + Pug template',
			inject: 'body',
			filename: './index.html',
			templateParameters: {
				'foo': 'bar'
			}
		})
	]
}