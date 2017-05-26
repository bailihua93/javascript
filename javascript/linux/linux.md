1. 安装软件
安装tar.gz软件
tar -xvzf test.tar.gz
./configure 
make
make install

或者
./name.run  运行

chmod 777 name 改权限

2. phpstorm破解
http://www.0-php.com:1017  
sudo ln -s /opt/PhpStorm-171.4694.2/bin /usr/local/bin/phpstorm  


3. xampp
使用方法：ctrl+alt+T ,打开终端，输入命令开启xampp：
sudo /opt/lampp/lampp start 
关闭xampp：
sudo /opt/lampp/lampp stop   

sudo chmod a+w -R /opt/lampp/htdocs  修改权限

sudo ln -sf /opt/lampp/htdocs/ ~/Public/  建立软链接  



如果浏览器访问文件的时候出现 Access forbidden ! 
多半是文件权限的问题，比如将一个 hufy 的文件夹放到htdocs里访问的时候，一般就会出现这样的提示。解决方法：进入到我们建立的软链接里。
cd Public 
sudo chmod -R 777 hufy     



将XAMPP调置为每次开机运行.
vi /etc/rc.d/rc.local
在最后面增加一行:
/opt/lampp/lampp start


