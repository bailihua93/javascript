##安装

###node镜像的位置
1.通过config命令

npm config set registry https://registry.npm.taobao.org 

2.编辑 ~/.npmrc 加入下面内容

registry = https://registry.npm.taobao.org

###初始化项目
+ 初始化
npm install webpack -g      
进入项目目录   
npm init  -f 
npm install webpack --save-dev

如果需要使用webpack开发工具，需要单独安装     
npm install webpack-dev-server --save-dev


mkdir app 
    -Greeter.js
    -main.js       
app中放原始数据和我们将要写的javascript模块       
mkdir public     
    -index.html
public文件存放给浏览器对去的数据（打包后的js和index.html)
      
+  操作
webpack (入口文件) （存放bundle.js 的地方）       
webpack app/main.js  public/bundle.js
