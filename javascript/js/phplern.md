sudo su
1. apache
sudo apt-get install apache2

sudo /etc/init.d/apache2 restart  重启服务器  stop 关闭  start 开启  
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

sudo apt-get install php7.0

        测试：php7.0 -v

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

常见问题
1.Secure SSH Client连接出错

        错误：algorithm negotiation failed

        解决：

                修改sshd的配置文件： vim /etc/ssh/sshd_config

                在配置文件中添加：

        Ciphers aes128-cbc,aes192-cbc,aes256-cbc,aes128-ctr,aes192-ctr,aes256-ctr,3des-cbc,arcfour128,arcfour256,arcfour,blowfish-cbc,cast128-cbc
        MACs hmac-md5,hmac-sha1,umac-64@openssh.com,hmac-ripemd160,hmac-sha1-96,hmac-md5-96
        KexAlgorithms diffie-hellman-group1-sha1,diffie-hellman-group14-sha1,diffie-hellman-group-exchange-sha1,diffie-hellman-group-exchange-sha256,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group1-sha1,curve25519-sha256@libssh.org

                重启sshd服务： service ssh restart

2.Xshell或Xftp中文乱码

        Xshell：文件->属性->终端->编码->UTF-8>

        Xftp：文件->属性->选项->选中使用UTF-8编码

3.安装MySQL出错

        错误：

        下列软件包有未满足的依赖关系：
        mysql-client : 依赖: mysql-client-5.5 但是它将不会被安装
        mysql-server : 依赖: mysql-server-5.5 但是它将不会被安装
        E: 无法修正错误，因为您要求某些软件包保持现状，就是它们破坏了软件包间的依赖关系。

        解决：两种解决方法

            使用Ubuntu自带的下载源，不要使用其他源（如网易）

            手动安装

                下载MySQL：http://dev.mysql.com/downloads/mysql/

                使用FTP工具上传到Ubuntu

                解压： tar -xvf mysql-server_5.7.13-1ubuntu16.04_i386.deb-bundle.tar

                安装：

        sudo dpkg -i libmysqlclient20_5.7.15-1ubuntu16.04_amd64.deb libmysqlclient-dev_5.7.15-1ubuntu16.04_amd64.deb libmysqld-dev_5.7.15-1ubuntu16.04_amd64.deb mysql-common_5.7.15-1ubuntu16.04_amd64.deb mysql-community-source_5.7.15-1ubuntu16.04_amd64.deb mysql-community-client_5.7.15-1ubuntu16.04_amd64.deb mysql-client_5.7.15-1ubuntu16.04_amd64.deb mysql-community-server_5.7.15-1ubuntu16.04_amd64.deb mysql-server_5.7.15-1ubuntu16.04_amd64.deb

4.安装pip出错

    解决：可改用如下命令：
    sudo apt-get install python-pip python-dev build-essential
    sudo pip install --upgrade pip
    sudo pip install --upgrade virtualenv

5.安装Django超时报错

        解决

            设置超时时间：sudo pip install django --default-timeout 100

            或者使用其他下载源：pip install web.py -i

6.安装MySQL-python报错

        错误：EnvironmentError: mysql_config not found

        解决：

            sudo apt-get install libmysqld-dev

            安装MySQL-python：pip install MySQL-python

7.更新Python库

pip install --upgrade 库名