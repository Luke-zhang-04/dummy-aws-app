import mysql from "mysql"

export const connection = mysql.createConnection({
    host: "todo-app.ccqkohsmp9lk.us-east-1.rds.amazonaws.com",
    user: "masterUser",
    password: process.env.DB_PASSWORD,
    database: "todo-app",
})

export default connection
