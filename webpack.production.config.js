var webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: {
        main: __dirname + '/index.js'
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/static/dist/',
        filename: 'bundle.js'
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
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}