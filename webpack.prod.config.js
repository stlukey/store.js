var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');

var BUILD_DIR = path.resolve(__dirname, 'build');
var PUBLIC_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

//const ENV = 'production';
const _API_URL = 'https://maryamspersianpantryapi.herokuapp.com';
const API_URL = JSON.stringify(_API_URL);
var ADMIN_DIR = path.resolve(__dirname, 'admin')

const DEMO = true;

//process.env['NODE_ENV'] = ENV;
//process.env['BABEL_ENV'] = ENV;
//const NODE_ENV = ENV;

const ADMIN_API_URL = JSON.stringify(_API_URL + '/admin');

const APPENLIGHT_API_KEY =
    JSON.stringify('2f78d4a6f30349679a5ebace72fe7301');

const GA_TRACKING_CODE =
    JSON.stringify('UA-89576317-1');


const STRIPE_KEY = JSON.stringify('pk_live_7lMGM0pt1Vka1OnZdFazxMYM');

var config = {
    entry: {
        bundle: [
            'babel-polyfill',
            APP_DIR + '/index.jsx'
        ],
        admin: [
            'babel-polyfill',
            ADMIN_DIR + '/index.jsx'
        ]
    },
    output: {
        path: BUILD_DIR,
        publicPath: '/build',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [ {
            test: /\.(js|jsx)$/,
            include: [APP_DIR, ADMIN_DIR],
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
        { test: /(\.css$)/, loaders: ['style-loader', 'css-loader', 'postcss-loader'] },
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
            API_URL,
            //NODE_ENV,
            APPENLIGHT_API_KEY,
            ADMIN_API_URL,
            GA_TRACKING_CODE,
            STRIPE_KEY,
            DEMO,
            //ENV
        })
    ],
    sassLoader:{
        data: "$APIURL: '" + _API_URL + "';"
    }
};

module.exports = config;
