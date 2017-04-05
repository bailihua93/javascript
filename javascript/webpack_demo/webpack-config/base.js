module.exports = {
    entry: process.cwd() + '/src/index.js',
    output: {
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: process.cwd() + '/src/index.html',
            favicon: process.cwd() + '/src/index.html'
        })
    ],
    devtool: 'eval-source-map' //enable srouce map
};