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

import mysql from "mysql"

export const connection = mysql.createConnection({
    host: "todo-app.ccqkohsmp9lk.us-east-1.rds.amazonaws.com",
    user: "masterUser",
    password: process.env.DB_PASSWORD,
    database: "todo-schema",
})

export const connect = (
    con: mysql.Connection,
): Promise<void> => new Promise((resolve, reject) => (
    con.connect((err) => (
        err ? reject(err) : resolve()
    ))
))

export type QueryResult = {
    fieldCount: number,
    affectedRows: number,
    insertId: number,
    serverStatus: number,
    warningCount: number,
    message: string,
    protocol41: boolean,
    changedRows: number,
}

export const isQueryResult = (
    obj: {[key: string]: unknown},
): obj is QueryResult => (
    obj.fieldCount === "number" &&
    obj.affectedRows === "number" &&
    obj.insertId === "number" &&
    obj.serverStatus === "number" &&
    obj.warningCount === "number" &&
    obj.message === "string" &&
    obj.protocol41 === "boolean" &&
    obj.changedRows === "number"
)

export const query = (
    con: mysql.Connection,
    queryString: string,
    values: (string | number | null)[],
): Promise<unknown> => new Promise((resolve, reject) => (
    con.query(queryString, values, (err, result) => (
        err ? reject(err) : resolve(result)
    ))
))

export const end = (
    con: mysql.Connection,
): Promise<void> => new Promise((resolve, reject) => (
    con.end((err) => (
        err === undefined ? resolve() : reject(err)
    ))
))

export default {
    connection,
    connect,
    query,
    end,
}
