const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

const PAGES_DIR = PATHS.src
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter(fileName => fileName.endsWith('.html'))

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
				test: /\.(png|jpg|gif|svg)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}img/[name][ext]`
				}
			},
			// Шрифты
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}fonts/[name][ext]`
				}
			},
			// CSS
			// {
			// 	test: /\.css$/i,
			// 	use: MiniCssExtractPlugin.loader
			// }
		]
	},
	resolve: {
		alias: {
			'~': PATHS.src,
			'@': `${PATHS.src}/js`
		}
	},
	plugins: [
		// HTML первый вариант
		// ...PAGES.map(
		// 	page =>
		// 		new HtmlWebpackPlugin({
		// 			template: `${PAGES_DIR}/${page}`,
		// 			filename: `./${page}`,
		// 			title: 'Webpack + Pug template',
		// 			inject: 'body'
		// 		}),
		// ),
		// HTML второй вариант
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			title: 'Webpack + Pug template',
			inject: 'body',
			filename: './index.html'
		}),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/page.html`,
			title: 'Webpack + Pug template another page',
			inject: 'body',
			filename: './page.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: `${PATHS.src}/${PATHS.assets}img`,
					to: `${PATHS.assets}img`
				},
				{ from: `${PATHS.src}/static`, to: '' }
			]
		})
	]
}