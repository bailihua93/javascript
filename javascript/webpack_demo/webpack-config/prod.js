const webpackMerge = require('webpack-merge');
const base = require('./base');

//specific config
module.exports = webpackMerge(base, {
    output: {
        filename: 'bundle.[chunkhash].js',
        path: process.cwd() + '/dist'
    }
});