#!/bin/bash

# Create a new group called "csye6225"
sudo groupadd csye6225

# Create a new user called "csye6225" and add it to the "csye6225" group
sudo useradd -m -g csye6225 csye6225

# change the ownership of the /webapp directory to the csye6225 user and group
sudo chown -R csye6225:csye6225 ~/projects/webapp