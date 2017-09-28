// require dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {

    // the base directory (absolute path) for resolving the entry option
    context: __dirname,
    // the entry point we created earlier
    // ./ means your current directory
    entry: {
        index: './assets/js/index.js',
        review: './assets/js/review.js',
    },
    
    output: {
        // where you want the compiled bundle to be stored
        path: path.resolve('./review/assets/bundles/'),
        // naming convention webpack should use for your files
        filename: '[name]-[hash].js',
    },

    plugins: [
        // tells webpack where to store data about your bundles
        new BundleTracker({filename: './review/webpack-stats.json'}),
    ],

    module: {
        loaders: [
            // a regexp that tells webpack to use the following loaders on all .js and .jsx files
            { test: /\.jsx?$/,
                // we don't want babel to transpile all the files in node_modules, would take a long time
                exclude: ['/node_modules/', /\.css$/, /(\/fonts)/],
                // use the babel loader
                loader: 'babel-loader',
                query: {
                    // specify that we will be dealing with React code
                    presets: ['es2015', 'react']
                }
            },
            {
               test: /\.css$/,
               exclude: ['/node_modules/', /\.jsx?$/, /(\/fonts)/],
               loader: 'css-loader'
            },
            {   
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/, 
                exclude: [/\.css$/, /\.jsx?$/],
                loader: 'file-loader'
            }
        ]
    }
}
