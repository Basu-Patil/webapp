#!/bin/bash

echo "Systemd Setup started"
sudo setenforce 0

sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# print webapp.service file content
sudo cat /etc/systemd/system/webapp.service

# reload the systemd manager configuration
sudo systemctl daemon-reload
# start the webapp service
sudo systemctl enable webapp.service

echo "Systemd Setup completed"



