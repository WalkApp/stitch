#!/usr/bin/env bash
env APPLICATION_PATH="/home/ubuntu/walk/stitch/index.js"

NODE_ENV=staging forever start $APPLICATION_PATH