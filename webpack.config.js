var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var combineLoaders = require('webpack-combine-loaders');

const API_URL = JSON.stringify('http://127.0.0.1:5000');
const ADMIN_API_URL = JSON.stringify('http://127.0.0.1:5000/admin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var PUBLIC_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var ADMIN_DIR = path.resolve(__dirname, 'admin')

var babelSettings = {
    // @remove-on-eject-begin
    babelrc: false,
    presets: ['es2015', 'react', 'stage-2', 'react-hmre'],
    plugins: ['transform-decorators-legacy'],
    // @remove-on-eject-end
    cacheDirectory: false
};

var jsxLoaders = combineLoaders([
  {
    loader: 'react-hot',
  },
  {
    loader: 'babel-loader',
    query: babelSettings,
  },
]);

var ENV = 'development';

process.env['NODE_ENV'] = ENV;
process.env['BABEL_ENV'] = ENV;

var config = {
    context: __dirname,
    entry: {
        bundle: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            APP_DIR + '/index.jsx'
        ] ,
        admin: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            ADMIN_DIR + '/index.jsx'
        ]
    },
    output: {
        path: BUILD_DIR,
        publicPath: '/build',
        filename: '[name].js'
    },
    debug: true,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [ {
            test: /\.(js|jsx)$/,
            include: [APP_DIR, ADMIN_DIR],
            loader: jsxLoaders
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
        { test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },,
        ]
    },
    // postcss:  [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins: [
        /* new HtmlWebpackPlugin({
            inject: true,
            template: PUBLIC_DIR + '/index.html',
        }),*/
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            API_URL, ADMIN_API_URL
        })
    ],
    cache: true,
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'index.html',
            rewrites: [
                { from: '/admin', to: '/admin.html' },
            ],
        }
    },

};

module.exports = config;

