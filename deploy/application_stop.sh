#!/usr/bin/env bash
mkdir /home/ubuntu/walk/stitch -p
if [ -f /home/ubuntu/.forever/pids/stitch.pid ]
then
  forever stop stitch
fi
