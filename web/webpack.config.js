var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var CssNext = require('postcss-cssnext');
var webpack = require('webpack')

var isProductionBuild = process.env.NODE_ENV === 'production';

var loaders = [
    {
        exclude: /node_modules/,
        test: /\.js/,
        loader: 'babel',
        query: {
            cacheDirectory: true,
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['transform-decorators-legacy', ['react-intl', {'messagesDir': __dirname + '/strings'}]],
        }
    },{
        test: /\.html$/,
        loader: 'file',
        query:{
            name: '[name].[ext]'
        }
    },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
            isProductionBuild
                ? 'style'
                : 'style-loader?sourceMap',
            isProductionBuild
                ? 'css?modules&importLoaders=1&localIdentName=[hash:base64:8]!postcss!sass'
                : 'css?modules&importLoaders=1&localIdentName=[path]__[local]___[hash:base64:5]!postcss!sass')
    }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=8192'
    }, {
        test: /\.json$/,
        loader: 'json'
    }
];

var plugins = [
    new webpack.ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('styles.css', {
        allChunks: true
    })
];

if (!isProductionBuild){
    //En desarrollo usamos la recarga rapida de componentes de react
    loaders.unshift({
        exclude: /node_modules/,
        test: /\.js/,
        loader: 'react-hot',
    })
} else {
    //Antes del empaquetado para produccion eliminamos el contenido de la carpeta dist
    plugins.unshift(new WebpackCleanupPlugin({}))
}


module.exports = {
    cache: true,
    entry:{
        javascript: __dirname + '/src/common/index.js',
        html: __dirname + '/src/common/index.html',
        //css: __dirname + '/src/common/styles/styles.scss'
    },
    output: {
        filename: 'app.js',
        path: __dirname + '/dist',
    },
    devtool: isProductionBuild ? false : 'source-map',
    module: {
        loaders: loaders
    },
    postcss: () => { return [CssNext] },
    plugins : plugins
};
