/* eslint-disable */
const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
        publicPath: '/static/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.(png|jpg|gif)$/, 
                loader: 'url?limit=819200'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.css$/, 
                loader: 'style!css?sourceMap' 
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            { 
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url?limit=50000&name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        })
    ]
}
