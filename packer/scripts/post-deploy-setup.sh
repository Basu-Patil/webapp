#!/bin/bash
# ---------------------------------------Post Deploy Setup---------------------------------------

# go to the project directory
cd ~/projects/

# create a .env file
touch .env

# write the environment variables to the .env file, take values from the packer template
cat <<EOF > .env
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