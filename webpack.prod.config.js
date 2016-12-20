var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');

var BUILD_DIR = path.resolve(__dirname, 'build');
var PUBLIC_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

const ENV = 'production';
const API_URL = 'https://maryamsingredientsapi.herokusapp.com';

process.env['NODE_ENV'] = ENV;
process.env['BABEL_ENV'] = ENV;
const NODE_ENV = ENV;

var config = {
    entry: [
        'babel-polyfill',
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: BUILD_DIR,
        publicPath: '/build/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [ {
            test: /\.(js|jsx)$/,
            include: APP_DIR,
            loader: 'babel-loader',
            query: {
                // @remove-on-eject-begin
                babelrc: false,
                presets: ['es2015', 'react', 'stage-2'],
                plugins: ['transform-decorators-legacy'],
                // @remove-on-eject-end
                cacheDirectory: false
            }
        }, {
            test: /\.scss$|\.sass$/,
            loaders: [
                'style-loader',
                'css-loader?sourceMap',
                'postcss-loader',
                'sass-loader?sourceMap&sourceMapContents&includePaths[]=' +
                        (path.resolve(__dirname, "./node_modules"))
            ]
        },
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
        {test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
        ]
    },
    postcss:  [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            API_URL, NODE_ENV
        })
    ],
};

module.exports = config;

