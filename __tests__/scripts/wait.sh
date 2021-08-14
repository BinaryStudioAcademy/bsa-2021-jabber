#!/usr/bin/bash

TIMER=0


function wait() {
  DOCKER_LOG_OUTPUT=$(docker logs backend)
  if [[ $DOCKER_LOG_OUTPUT =~ "Listening to connections on Port — 3001, Environment: development" ]]; then
    RESULT=2
    echo 'Sever is up!'
  elif [ $TIMER -ge 180 ]; then
    RESULT=2
    echo 'Timeout exceeded. Server still down.'
  else
    RESULT=1
  fi
}


while [[ $RESULT -lt 2 ]]; do
  echo 'Waiting for server . . .'
  sleep 5
  TIMER=$((TIMER+5))
  wait
done
