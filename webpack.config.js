const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        app: path.resolve(__dirname, '/src/main.ts'),
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
        open: false,
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
    resolve: {
        extensions: ['.js', '.ts', '.glsl', '.json', '.scss'],
        modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
    },
    // tree shaking
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    compress: true,
                    mangle: true,
                    keep_fnames: false,
                    keep_classnames: false
                }
            })
        ]
    },
    stats: { errorDetails: true },
    // devtool: 'source-map', // outcomment if tsconfig source map didn't work
}
