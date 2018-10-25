#!/bin/bash

pwd

cd WebApp

pwd

sudo npm install

sudo npm install -g pm2

pm2 start server.js
