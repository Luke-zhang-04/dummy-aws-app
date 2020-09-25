#! /bin/bash

lint() {
    printf "Linting .js, .jsx, .ts, and .tsx with ESLint\n"
    npx eslint "*/**/*.{js,jsx,ts,tsx}" &

    printf "Linting .scss with Stylelint\n"
	npx stylelint "*/**/*.scss" &
    wait
}

lintFix() {
    printf "Linting .js, .jsx, .ts, and .tsx with ESLint and fixing\n"
    npx eslint "*/**/*.{js,jsx,ts,tsx}" --fix &

    printf "Linting .scss with Stylelint and fixing\n"
	npx stylelint "*/**/*.scss" --fix &
    wait
}

if [[ $1 == "-f" ]]||[[ $1 == "--fix" ]]; then
    lintFix
else
    lint
fi
