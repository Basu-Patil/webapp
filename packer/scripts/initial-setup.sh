#!/bin/bash
# ---------------------------------------Initial Setup---------------------------------------

# update centos
# sudo dnf update -y

echo "Initial Setup started"

# enable latest nodejs
sudo dnf module enable nodejs:20 -y

# install nodejs
sudo dnf install nodejs -y

# install npm
sudo dnf install npm -y


#install unzip
sudo dnf install unzip -y

echo "Initial Setup completed"






