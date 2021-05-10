const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
		publicPath: '/',
		assetModuleFilename: './[name][ext][query]'
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
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}img/[name][ext][query]`
				}
			},
			// Шрифты
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}fonts/[name][ext][query]`
				}
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
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			title: 'Webpack + Pug template',
			inject: 'body',
			filename: './index.html',
			templateParameters: {
				'foo': 'bar'
			}
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/static`, to: '' }
			]
		})
	]
}