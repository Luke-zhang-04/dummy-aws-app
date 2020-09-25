import express from "express"
import serverless from "serverless-http"

const app = express(), // eslint-disable-next-line
    port = process.env.PORT || 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/api/info", (_, res) => {
    res.send({
        application: "sample-app",
        version: "1.0",
    })
})

app.post("/api/getback", (req, res) => {
    res.send({...req.body})
})

if (process.argv.includes("--local")) {
    app.listen(port, () => console.log(`Listening on: ${port}`))
}

export const handler = serverless(app)
