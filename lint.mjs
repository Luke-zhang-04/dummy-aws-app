#!/bin/node

import chokidar from "chokidar"
import {exec} from "child_process"
import niceTry from "nice-try"

const paths = {
        eslint: (flags, dir) => (
            `./node_modules/.bin/eslint_d "${dir}/**/*.{js,jsx,ts,tsx}" ${flags}`
        ),
        stylelint: (flags, dir) => (
            `./node_modules/.bin/stylelint "${dir}/**/*.scss" ${flags} --allow-empty-input`
        ),
    },


    runLint = (path) => new Promise((resolve, reject) => {
        try {
            exec(path, (_, stdout, stderr) => {
                if (stderr) {
                    console.error(stderr)
                    reject(stderr)
                }

                resolve(stdout)
            })
        } catch {
            console.log("An error occured. The linter likely found a problem")
        }
    }),

    lint = (dir = "*") => {
        const flags = process.argv.includes("--fix") ||
            process.argv.includes("--watch")
                ? "--fix"
                : "",
            eslint = niceTry(() => runLint(paths.eslint(flags, dir))),
            stylelint = niceTry(() => runLint(paths.stylelint(flags, dir)))

        return Promise.all([eslint, stylelint])
    }

lint()

if (process.argv.includes("--watch")) {
    chokidar.watch("./client").on("change", async () => {
        try {
            await lint("client")
        } catch {
            console.log("An error occured. The linter likely found a problem")
        }

        console.log("Complete!")
    })

    chokidar.watch("./server").on("change", async () => {
        try {
            await lint("server")
        } catch {
            console.log("An error occured. The linter likely found a problem")
        }

        console.log("Complete!")
    })
}
