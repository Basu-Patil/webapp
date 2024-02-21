#!/bin/bash

#install zip

# sudo dnf install zip -y

# create a zip file of the webapp directory
# zip -r /tmp/webapp.zip ../webapp/

#create projects directory
mkdir -p ~/projects/webapp

# go to the project directory
cd ~/projects/webapp/

#unzip the file file from the /tmp directory to the project directory
unzip /tmp/webapp.zip -d ~/projects/webapp/

cd ~/projects/webapp/

#npm install
sudo npm install