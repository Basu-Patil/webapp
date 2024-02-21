#!/bin/bash
sudo setenforce 0

sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# print webapp.service file content
sudo cat /etc/systemd/system/webapp.service

# reload the systemd manager configuration
sudo systemctl daemon-reload
# start the webapp service
sudo systemctl enable webapp.service

#show the user and group of the /webapp directory
sudo ls -l ~/projects/webapp
# print the user and group of the /webapp directory
sudo stat ~/projects/webapp


