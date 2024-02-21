#!/bin/bash

# Create a new group called "csye6225"
sudo groupadd csye6225

sudo useradd -m -g csye6225 -s /sbin/nologin csye6225

sudo chown -R csye6225 /home/*

sudo chmod -R u+x /home/*

sudo chgrp -R csye6225 /home/*

# # change the ownership of the /webapp directory to the csye6225 user and group
# sudo chown -R csye6225:csye6225 ~/webapp

