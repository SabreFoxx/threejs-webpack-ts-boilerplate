const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	context: __dirname,
	entry: {
		app: path.resolve(__dirname, '/src/index.ts'),
		fpsCounter: path.resolve(__dirname, '/src/fps.ts'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/',
		clean: true
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		port: 5000,
		open: true,
		hot: true,
		compress: true,
		historyApiFallback: true
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: { loader: 'ts-loader' }
		}, {
			test: /\.scss$/,
			exclude: /node_modules/,
			use: ['style-loader', 'css-loader', 'sass-loader']
		}, {
			test: /\.(glsl)$/,
			loader: 'ts-shader-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Snackman',
			filename: 'index.html', template: 'src/app.html'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/assets", to: "assets" },
			]
		})
	],
	// devtool: 'source-map', // outcomment if tsconfig source map didn't work
	resolve: {
		extensions: ['.js', '.ts', '.glsl', '.json', '.scss'],
		modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
	},
	stats: { errorDetails: true }
}