##配置
sudo su
1. apache
sudo apt-get install apache2

  重启服务器  stop 关闭  start 开启  
apache的默认文档根目录是在ubuntu上的/var/www目录 ,配置文件是/ etc/apache2/apache2.conf。配置存储在的子目录在/etc/apache2目录。  
 sudo chmod 777 -R /var/www/ 获取权限
2. mysql
apt-get install mysql-server mysql-client  

3. php

apt-get install php7.0 libapache2-mod-php7.0   

4.  在var/www/html中放东西  localhost/name.php 来访问



# apt-get update
# apt-get upgrade

搭建LAMP
1.安装Apache

sudo apt-get install apache2
sudo /etc/init.d/apache2 restart    启服务器  stop 关闭  start 开启

测试： 浏览器访问http://Ubuntu的IP，出现It Works!网页。
查看状态： service apache2 status/start/stop/restart
Web目录： /var/www
安装目录： /etc/apache2/
全局配置： /etc/apache2/apache2.conf
监听端口： /etc/apache2/ports.conf
虚拟主机： /etc/apache2/sites-enabled/000-default.conf

2.安装MySQL

sudo apt-get install mysql-server mysql-client  

        测试：mysql -u root -p

        查看状态：service mysql status/start/stop/retart

        查看监听端口的情况：netstat -tunpl 或 netstat -tap

3.安装PHP

sudo apt-get install php7.0 php7.0-dev

 测试：php7.0 -v

bin文件 -》/usr/bin
库文件 -》/usr/lib/
其它的图标啊什么的 -》/usr/share
配置 -》/etc/

下载gopaer
php go-pear.php



4.安装其他模块

sudo apt-get install libapache2-mod-php7.0
sudo apt-get install php7.0-mysql

重启服务

        service apache2 restart

        service mysql restart

测试Apache能否解析PHP

        vim /var/www/html/phpinfo.php

        文件中写：<?php echo phpinfo();?>

         浏览器访问：http://ubuntu地址/phpinfo.php，出现PHP Version网页

5.修改权限

sudo chmod 777 /var/www
6.安装phpMyAdmin

sudo apt-get install phpmyadmin

        安装：选择apache2，点击确定。下一步选择是要配置数据库，并输入密码。

        创建phpMyAdmin快捷方式：sudo ln -s /usr/share/phpmyadmin /var/www/html

        启用Apache mod_rewrite模块：sudo a2enmod rewrite

        重启服务：

                service php7.0-fpm restart

                service apache2 restart

        测试：浏览器访问：http://ubuntu地址/phpmyadmin

7.配置Apache

vim /etc/apache2/apache2.conf

        添加：

            AddType application/x-httpd-php .php .htm .html

            AddDefaultCharset UTF-8

        重启Apache服务

安装python包
1.pip

sudo apt-get install python-pip
2.Django

pip install django

    测试：import django

##3.MySQL-python
pip install MySQL-python

    测试：import MySQLdb



pip install --upgrade 库名




vacode xdebug

 sudo  pecl install xdebug

zend_extension="/usr/local/php/modules/xdebug.so"



##基本
###
1. 标记，
<?php 和 ?>    最好去掉后面的

文件末尾的 PHP 代码段结束标记“;”可以不要，有些情况下当使用 include 或者 require 时省略掉会更好些，这样不期望的空白符就不会出现在文件末尾，之后仍然可以输出响应标头。在使用输出缓冲时也很便利，就不会看到由包含文件生成的不期望的空白符。   


tar -xvzf test.tar.gz