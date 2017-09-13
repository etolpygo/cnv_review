// require dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
    // the base directory (absolute path) for resolving the entry option
    context: __dirname,
    // the entry point we created earlier
    // ./ means your current directory
    entry: './assets/js/index.js',
    
    output: {
        // where you want the compiled bundle to be stored
        path: path.resolve('./review/assets/bundles/'),
        // naming convention webpack should use for your files
        filename: '[name]-[hash].js',
    },

    plugins: [
        // tells webpack where to store data about your bundles
        new BundleTracker({filename: './review/webpack-stats.json'}),
        new webpack.ProvidePlugin({ 
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery' 
        })
    ],

    module: {
        loaders: [
            // a regexp that tells webpack to use the following loaders on all .js and .jsx files
            { test: /\.jsx?$/,
                // we don't want babel to transpile all the files in node_modules, would take a long time
                exclude: /node_modules/,
                // use the babel loader
                loader: 'babel-loader',
                query: {
                    // specify that we will be dealing with React code
                    presets: ['react']
                }
            }
        ]
    }
}
