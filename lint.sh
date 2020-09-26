#!/bin/bash

./node_modules/.bin/stylelint "*/**/*.scss" --allow-empty-input &
./node_modules/.bin/eslint_d "*/**/*.{js,jsx,ts,tsx}" &

wait
