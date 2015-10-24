#!/bin/bash
sudo chown ubuntu:ubuntu /home/ubuntu/walk/stitch -R

cd /home/ubuntu/walk/stitch
npm install
gulp assets:staging
