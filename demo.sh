#!/bin/bash

trap "kill 0" EXIT

export GENERATE_SOURCEMAP=false
yarn workspace app start

wait
