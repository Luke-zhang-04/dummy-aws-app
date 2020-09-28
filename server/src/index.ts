import dotenv from "dotenv"
import express from "express"
import serverless from "serverless-http"

dotenv.config()

const app = express()

app.use((_, res, next) => {
    process.argv.includes("--dev")
        ? res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        : res.setHeader("Access-Control-Allow-Origin", "https://luke-zhang-04.github.io/")

    res.setHeader("Access-Control-Allow-Credentials", 1)

    next()
})

app.get("/", (_, response) => response.send({
    app: "Todo app",
    desc: "A simple app for getting used to aws",
    license: "0BSD",
    author: "Luke Zhang",
}))

export const handler = serverless(app)

export default app
