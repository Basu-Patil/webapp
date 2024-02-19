#!/bin/bash
# ---------------------------------------Initial Setup---------------------------------------

# update centos
# sudo dnf update -y

# enable latest nodejs
sudo dnf module enable nodejs:20 -y

# install nodejs
sudo dnf install nodejs -y

#install npm
sudo dnf install npm -y

#install unzip
sudo dnf install unzip -y

#install mysql
sudo dnf install mysql-server -y

#enable mysql
sudo systemctl enable mysqld

#start mysql
sudo systemctl start mysqld

# Try connecting to mysql if it is working
mysql -u root <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';
exit
EOF

# #install zip
# sudo dnf install zip -y

# #zip the webapp directory
# zip -r ./webapp.zip ../../../webapp/






