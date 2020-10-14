import type {Handler as ExpressHandler} from "express"
import jwtDecode from "jwt-decode"
import sql from "../sql"
import stats from "../stats"
import utils from "./db-utils"


const addItem = async (
    title: string,
    desc: string,
    sub: string,
): Promise<void> => {
    await sql.connect(sql.connection)

    await sql.query(
        sql.connection,
        "INSERT INTO `todo-schema`.item (title, description, uid) VALUES (?, ?, ?);",
        [
            title,
            desc,
            sub,
        ],
    )
}

export const addTodoItem: ExpressHandler = async ({body}, response) => {
    if (utils.isTodoItem(body)) {
        const user = jwtDecode(body.idToken)

        if (
            user !== null &&
            typeof user === "object" &&
            utils.isIdTokenPayload(user)
        ) {
            try {
                const isvalidToken = await utils.jwtIsValid(body.idToken, user)

                if (!isvalidToken) {
                    throw new Error("ID Token is invalid")
                } else if (user.exp * 1000 < Date.now()) {
                    return response.status(stats.unauthorized).json({
                        reason: "expiredToken",
                        message: "Id Token is Expired",
                    })
                }

                await addItem(body.title, body.desc, user.sub)

                return response.status(stats.ok).json({
                    message: "Success!",
                })
            } catch (err: unknown) {
                return response.status(stats.internalError).json({
                    message: "An unknown error occured",
                })
            }
        }

        return response.status(stats.internalError).json({
            message: "Decoded JWT is missing properties",
        })
    }

    return response.status(stats.badRequest).json({
        message: "Missing necessary params",
    })
}

export default {
    addTodoItem,
}
