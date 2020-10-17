/**
 * Dummy AWS application
 * @license 0BSD
 * @author Luke Zhang luke-zhang-04.github.io
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the 0BSD License
 *
 * This program is distributed in the hope that it will be useful,
 * but THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
 * INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 */

import dotenv from "dotenv"

dotenv.config()

/* eslint-disable sort-imports */
import auth from "./auth"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import cors from "cors"
import db from "./db"
import express from "express"
import serverless from "serverless-http"

const app = express()

app.use(cors({
    origin:
        process.argv.includes("--dev")
            ? "http://localhost:3000"
            : "https://luke-zhang-04.github.io",
    optionsSuccessStatus: 200,
    credentials: true,
}))

app.use(bodyParser.json())

app.use(cookieParser())


app.post("/auth/register", auth.register)

app.post("/auth/login", auth.login)

app.post("/auth/logout", auth.logout)

app.get("/auth/tokens", auth.getTokensFromRefreshToken)


app.post("/todo/addItem", db.addTodoItem)


app.get("/", (_, response) => response.send({
    app: "Todo app",
    desc: "A simple app for getting used to aws",
    license: "0BSD",
    author: "Luke Zhang",
}))

export const handler = serverless(app)

export default app
