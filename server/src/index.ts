import cors from "cors"
import express from "express"
import serverless from "serverless-http"

const app = express()

app.use(cors({
    origin: [
        process.argv.includes("--dev")
            ? "http://localhost:3000"
            : "https://luke-zhang-04.github.io/"
    ],
    optionsSuccessStatus: 200,
}))

app.get("/", (_, response) => response.send({
    app: "Todo app",
    desc: "A simple app for getting used to aws",
    license: "0BSD",
    author: "Luke Zhang"
}))

export const handler = serverless(app)

export default app
