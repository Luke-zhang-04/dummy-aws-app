import express from "express"
import serverless from "serverless-http"

const app = express()

app.get("/", (_, res) => res.send("Hello world!"))

export const handler = serverless(app)
