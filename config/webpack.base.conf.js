const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')

const PATHS = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/pages`
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter(fileName => fileName.endsWith('.pug'))

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
			// PUG
			{
				test: /.pug$/i,
				loader: 'pug-loader'
			},
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
				loader: 'file-loader',
				options: {
					name: `${PATHS.assets}img/[name].[ext]`
				}
			},
			// Шрифты
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: `${PATHS.assets}fonts/[name][ext]`
				}
			}
		]
	},
	resolve: {
		alias: {
			'~': PATHS.src, // Пример: background-image: url("~/assets/img/image.jpg");
			'@styles': `${PATHS.src}/pug/styles`,
			'@blocks': `${PATHS.src}/pug/blocks`,
			'@layout': `${PATHS.src}/pug/layout`,
			'@pages': `${PATHS.src}/pug/pages`,
			'@utils': `${PATHS.src}/pug/utils`,
		}
	},
	plugins: [
		// Копирование файлов
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATHS.src}/static`, to: '' }
			]
		}),
		// PUG
		...PAGES.map(
			page =>
				new HtmlWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${page.replace(/\.pug/, '.html')}`,
					title: 'Webpack + Pug template',
					inject: 'body'
				}),
		)
	]
}