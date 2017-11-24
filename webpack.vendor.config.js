const { resolve } = require('path');
const webpack = require('webpack');
const path = require('path');

const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const VENDOR_NAME = 'vendor';

const PATHS = {
	output: resolve(__dirname, 'dist/'),
	manifest: resolve(__dirname, `dist/${VENDOR_NAME}/`),
	vendor: resolve(__dirname, `dist/${VENDOR_NAME}`)
};

module.exports = () => {
	const webpackConfig = {

		entry: {
			vendor: [
				'angular'
			]
		},
		output: {
			filename: '[name].dll.[hash].js',
			path: PATHS.vendor,
			library: '[name]_lib',
			publicPath: `./${VENDOR_NAME}/`
		},
		plugins: [
			new CleanWebpackPlugin([PATHS.vendor]),
			new webpack.DllPlugin({
				path: path.join(PATHS.vendor, '[name]-manifest.json'),
				name: '[name]_lib',
			}),
			new AssetsPlugin({
				path: PATHS.vendor,
				filename: 'vendor-assets.json'
			})
		]
	};

	return webpackConfig;
};


