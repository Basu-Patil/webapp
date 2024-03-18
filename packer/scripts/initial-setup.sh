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

# install ops agent
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

echo "Initial Setup completed"






