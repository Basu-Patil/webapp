#!/bin/bash
# ---------------------------------------Post Deploy Setup---------------------------------------

echo "Post Deploy Setup started"
# go to the project directory
cd /opt/projects/webapp

# create a .env file
sudo touch .env

# write the environment variables to the .env file, take values from the packer template
cat <<EOF | sudo tee .env
PORT=${PORT}
MYSQL_HOST=${MYSQL_HOST}
MYSQL_USER=${MYSQL_USER}
MYSQL_PASSWORD=${MYSQL_PASSWORD}
MYSQL_DATABASE=${MYSQL_DATABASE}
DIALECT=${DIALECT}
MYSQL_PORT=${MYSQL_PORT}
EOF

# start the application
# npm start

sudo systemctl daemon-reload

echo "Post Deploy Setup completed"