const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: 'main.ts',
        utils: 'utils.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        sourceMapFilename: '[name].[contenthash].js.map',
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
            filename: 'index.html', template: 'app.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "assets", to: "assets" },
            ]
        }),
        // new JavaScriptObfuscator({
        //     rotateUnicodeArray: true
        // }, ['app.[contenthash].js'])
    ],
    resolve: {
        extensions: ['.js', '.ts', '.glsl', '.json', '.scss'],
        modules: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
        alias: {
            // specify specific exports file; useful for tree shaking exports if you customize it
            three: path.join(__dirname, 'node_modules/three/src/Three.js'),
        }
    },
    optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                // see https://github.com/terser/terser for options
                terserOptions: {
                    compress: { drop_console: true, ecma: 2016, passes: 2, module: true },
                    mangle: {
                        module: true, properties: {
                            keep_quoted: true,
                            regex: /^_/ // private properties that begin with _
                        }
                    }
                }
            })
        ]
    },
    stats: { errorDetails: true },
    devtool: 'eval-source-map' // see https://webpack.js.org/configuration/devtool/
}
