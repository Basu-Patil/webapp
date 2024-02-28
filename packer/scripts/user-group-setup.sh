#!/bin/bash

echo "User and Group Setup started"
# Create a new group called "csye6225"
sudo groupadd csye6225

sudo useradd -g csye6225 -s /sbin/nologin csye6225

sudo chown -R csye6225:csye6225 /opt/projects/webapp


# # change the ownership of the /webapp directory to the csye6225 user and group
# sudo chown -R csye6225:csye6225 ~/webapp

echo "User and Group Setup completed"

