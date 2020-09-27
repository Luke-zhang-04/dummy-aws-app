import cors from "cors"
import express from "express"
import serverless from "serverless-http"

const app = express()

app.use(cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
}))

app.get("/", (_, res) => res.send({msg: "Hello world!"}))

export const handler = serverless(app)

export default app
