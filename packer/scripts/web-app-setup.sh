#!/bin/bash

echo "Web App Setup started"
#create projects directory
sudo mkdir -p /opt/projects/webapp

# go to the project directory
cd /tmp/

#unzip the file file from the /tmp directory to the project directory
sudo unzip webapp.zip -d /opt/projects/webapp

#npm install
cd /opt/projects/webapp && sudo npm install

echo "Web App Setup completed"

sudo chown -R csye6225:csye6225 /var/log/

# create folder for logs
cd /var/log/ && sudo mkdir webapp
