#!/bin/node

import chokidar from "chokidar"
import {exec} from "child_process"

const paths = {
        eslint: (flags, dir) => (
            `./node_modules/.bin/eslint_d "${dir}/**/*.{js,jsx,ts,tsx}" ${flags}`
        ),
        stylelint: (flags, dir) => (
            `./node_modules/.bin/stylelint "${dir}/**/*.scss" ${flags} --allow-empty-input`
        ),
    },


    runLint = (path) => new Promise((resolve, reject) => {
        exec(path, (error, stdout, stderr) => {
            if (stderr) {
                console.error(stderr)
                reject(stderr)
            }

            if (error) {
                console.error(error)
                reject(error)
            }

            resolve(stdout)
        })
    }),

    lint = (dir = "*") => {
        const flags = process.argv.includes("--fix") ||
            process.argv.includes("--watch")
                ? "--fix"
                : "",
            eslint = runLint(paths.eslint(flags, dir)),
            stylelint = runLint(paths.stylelint(flags, dir))

        return Promise.all([eslint, stylelint])
    }

lint()

if (process.argv.includes("--watch")) {
    chokidar.watch("./client").on("change", async () => {
        await lint("client")

        console.log("Complete!")
    })

    chokidar.watch("./server").on("change", async () => {
        await lint("server")

        console.log("Complete!")
    })
}
