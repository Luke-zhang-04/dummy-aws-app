import base64url from "base64-url"

export type TodoItem = {
    title: string,
    desc: string,
    idToken: string,
}

export const isTodoItem = (obj: {[key: string]: unknown}): obj is TodoItem => (
    typeof obj.title === "string" &&
    typeof obj.desc === "string" &&
    typeof obj.idToken === "string"
)

export type IdTokenPayload = {
    sub: string,
    aud: string,
    email_verified: boolean,
    event_id: string,
    token_use: "id",
    auth_time: number,
    iss: string,
    "cognito:username": string,
    exp: number,
    preferred_username: string,
    iat: number,
    email: string,
}

type UnknownObj = {[key: string]: unknown}

export const isIdTokenPayload = (
    obj: unknown,
): obj is IdTokenPayload => (
    obj !== null &&
    typeof obj === "object" &&
    typeof (obj as UnknownObj).sub === "string" &&
    typeof (obj as UnknownObj).aud === "string" &&
    typeof (obj as UnknownObj).email_verified === "boolean" &&
    typeof (obj as UnknownObj).event_id === "string" &&
    (obj as UnknownObj).token_use === "id" &&
    typeof (obj as UnknownObj).auth_time === "number" &&
    typeof (obj as UnknownObj).iss === "string" &&
    typeof (obj as UnknownObj)["cognito:username"] === "string" &&
    typeof (obj as UnknownObj).exp === "number" &&
    typeof (obj as UnknownObj).preferred_username === "string" &&
    typeof (obj as UnknownObj).iat === "number" &&
    typeof (obj as UnknownObj).email === "string"
)

type JWTHeader = {
    kid: string,
    alg: "RS256",
}

const isValidJWTHeader = (obj: {[key: string]: any}): obj is JWTHeader => (
        typeof obj.kid === "string" &&
        obj.alg === "RS256"
    ),

    kidIsValid = async (kid: string): Promise<boolean> => {
        for (const key of (await import("../jwk.json")).keys) {
            if (key.kid === kid) {
                return true
            }
        }

        return false
    }

export const jwtIsValid = async (
    jwt: string,
    iss: string,
    tokenUse: string,
): Promise<boolean> => {
    const header = JSON.parse(base64url.decode(jwt.split(".")[0])) as {[key: string]: unknown}

    if (!isValidJWTHeader(header)) {
        console.log(header)

        throw new Error("JWT Header is not valid")
    }

    const isvalidKid = await kidIsValid(header.kid),
        isvalidTokenUse = tokenUse === "id",
        isvalidIss = iss.split("/")[3] === process.env.UserPoolId

    return isvalidKid && isvalidTokenUse && isvalidIss
}

export default {
    isTodoItem,
    isIdTokenPayload,
    jwtIsValid,
}
