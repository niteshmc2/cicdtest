#!/bin/bash

pwd

export RDS_HOSTNAME=`sed -n '1p' .env`
export RDS_USERNAME=`sed -n '2p' .env`
export RDS_PASSWORD=`sed -n '3p' .env`
export RDS_PORT=`sed -n '4p' .env`


cd WebApp

pwd

sudo npm install

sudo npm install -g pm2

pm2 start server.js
