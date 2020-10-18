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

import * as utils from "../db-utils"
import type {Handler as ExpressHandler} from "express"
import jwt from "jsonwebtoken"
import sql from "../../sql"
import stats from "../../stats"

type TodoResponse = {
    id: number,
    title: string,
    description: string,
    completed: 1 | 0,
    uid: string,
}

const isTodoResponse = (
        obj: {[key: string]: unknown},
    ): obj is TodoResponse => (
        typeof obj.id === "number" &&
    typeof obj.title === "string" &&
    typeof obj.description === "string" &&
    typeof obj.uid === "string" &&
    (obj.completed === 0 || obj.completed === 1)
    ),

    getItems = async (sub: string): Promise<TodoResponse[]> => {
        const result = await sql.query(
            sql.connection,
            "SELECT * FROM `todo-schema`.item WHERE uid = ?;",
            [sub],
        )

        if (
            result instanceof Array &&
        result[0] instanceof Object &&
        isTodoResponse(result[0])
        ) {
            return result
        }

        return []
    }

export const getTodoItems: ExpressHandler = async ({query}, response) => {
    if (typeof query.idToken === "string") {
        const user = jwt.decode(query.idToken)

        if (
            user !== null &&
            typeof user === "object" &&
            utils.isIdTokenPayload(user)
        ) {
            try {
                const isvalidToken = await utils.jwtIsValid(
                    query.idToken,
                    user,
                )

                if (!isvalidToken) {
                    throw new Error("ID Token is invalid")
                } else if (user.exp * 1000 < Date.now()) {
                    return response.status(stats.unauthorized).json({
                        reason: "expiredToken",
                        message: "Id Token is Expired",
                    })
                }

                const items = await getItems(user.sub)

                return response.status(stats.ok).json({
                    items,
                })
            } catch (err: unknown) {
                return response.status(stats.internalError).json({
                    message: `An unknown error occured ${err}`,
                })
            }
        }
    }

    return response.status(stats.badRequest).json({
        message: "Misisng necessary params or params were invalid",
    })
}
