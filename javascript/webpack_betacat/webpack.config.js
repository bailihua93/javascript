module.exports = {
    devtool: 'eval-source-map', //大型项目用cheap-module-eval-source-map
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/public", //打包后的文件存放的地方
        filename: "bundle.js" //打包后输出文件的文件名
    },


    module: { //在配置文件里添加JSON loader
        loaders: [{
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
             {
        test: /\.css$/,
        loader: 'style!css?modules'//跟前面相比就在后面加上了?modules
      }
        ]
    },

    devServer: { //server
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    }
}