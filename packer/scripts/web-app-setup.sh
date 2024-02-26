#!/bin/bash

echo "Web App Setup started"
#create projects directory
sudo mkdir /opt/projects

# go to the project directory
cd /opt/projects/

#unzip the file file from the /tmp directory to the project directory
unzip /tmp/webapp.zip -d /opt/projects/

#npm install
cd /opt/projects/webapp && sudo npm install

echo "Web App Setup completed"