const { resolve } = require('path');
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
	output: resolve(__dirname, 'dist/'),
	app: resolve(__dirname, 'app/app.module.js'),
	nodeModules: resolve(__dirname, 'node_modules'),
	vendor: resolve(__dirname, 'dist/vendor'),
};

module.exports = () => {
	const devServerPort = process.env.PORT || 6060;

	const webpackConfig = {
		entry: {
			app: PATHS.app
		},
		output: {
			filename: '[name].bundle.[hash].js',
			path: PATHS.output,
			publicPath: './'
		},
		resolve: {
			modules: [
				PATHS.nodeModules,
			]
		},
		devtool: 'source-map',

		devServer: {
			port: devServerPort,
			publicPath: `http://localhost:${devServerPort}/`,
			watchOptions: {
				ignored: /node_modules/,
			},
			contentBase: PATHS.output,
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader',
				},
				{
					test: /\.html$/,
					loader: 'raw-loader',
				},
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					})
				}
			]
		},

		plugins: [
			new CleanWebpackPlugin([PATHS.output], {
				exclude: PATHS.vendor
			}),
			new webpack.DllReferencePlugin({
				manifest: require(path.join(PATHS.vendor, 'vendor-manifest.json'))
			}),
			new ExtractTextPlugin({
				filename: 'css/app.css',
				allChunks: true
			}),
			new HtmlWebpackPlugin({
				template: 'app/index.ejs',
				filename: 'index.html',
				inject: false,
				assets: require(path.join(PATHS.vendor, 'vendor-assets.json'))
			})
		]
	};

	return webpackConfig;
};


