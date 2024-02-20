#!/bin/bash

sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
sudo chown root:root /etc/systemd/system/webapp.service
sudo chmod 644 /etc/systemd/system/webapp.service
sudo systemctl daemon-reload
sudo systemctl enable webapp.service
