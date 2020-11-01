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

import auth, {TokenRequest} from "./auth-utils"
import {CognitoUserSession} from "amazon-cognito-identity-js"
import type {Handler as ExpressHandler} from "express"
import fetch from "node-fetch"
import jwt from "jsonwebtoken"
import qs from "qs"
import stats from "../stats"

interface UserInfo {
    idToken: string,
    sub: string,
    emailVerified: boolean,
    cognitoUsername: string,
    username: string,
    email: string,
    refreshToken: string,
    accessToken: string,
}

/* eslint-disable camelcase */
type IdTokenPayload = {
    sub: string,
    aud: string,
    email_verified: boolean,
    event_id: string,
    token_use: "id",
    auth_time: number,
    iss: string,
    "cognito:username": string,
    preferred_username: string,
    exp: number,
    iat: number,
    email: string,
}
/* eslint-enable camelcase */

const createInfo = (user: CognitoUserSession): UserInfo => {
    const idToken = user.getIdToken(),
        accessToken = user.getAccessToken(),
        refreshToken = user.getRefreshToken()

    return {
        idToken: idToken.getJwtToken(),
        refreshToken: refreshToken.getToken(),
        accessToken: accessToken.getJwtToken(),
        sub: idToken.payload.sub as string,
        emailVerified: idToken.payload.email_verified as boolean,
        cognitoUsername: idToken.payload["cognito:username"] as string,
        username: idToken.payload.preferred_username as string,
        email: idToken.payload.email as string,
    }
}

export const register: ExpressHandler = async ({body}, response) => {
    if (auth.hasValidRegisterParams(body)) {
        try {
            await auth.register(
                body.username,
                body.email,
                body.password,
            )

            return response.status(stats.ok)
        } catch (err: unknown) {
            return response.status(stats.badRequest).json(err)
        }
    }

    return response.status(stats.badRequest).json({
        message: "Missing necessary params",
    })
}

export const login: ExpressHandler = async ({body}, response) => {
    if (auth.hasValidLoginParams(body)) {
        try {
            const user = await auth.login(
                body.email,
                body.password,
            )

            if (user instanceof Error) {
                throw user
            }

            const info = createInfo(user)

            return response
                .cookie(
                    "refreshToken",
                    info.refreshToken,
                    {
                        httpOnly: true,
                        path: "/",
                        sameSite: "none",
                        secure: true,
                    },
                )
                .status(stats.ok)
                .json(info)
        } catch (err: unknown) {
            return response.status(stats.badRequest).json(err)
        }
    }

    return response.status(stats.badRequest).json({
        message: "Missing necessary params",
    })
}

const getTokens = async (
    cookies: TokenRequest,
): Promise<{[key: string]: unknown}> => (
    await (await fetch(
        "https://6lnooio7f6.auth.us-east-1.amazoncognito.com/oauth2/token",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded",
            },
            body: qs.stringify({
                grant_type: "refresh_token",
                client_id: process.env.ClientId,
                refresh_token: cookies.refreshToken,
            }),
        },
    )).json() as {[key: string]: unknown}
)

export const getTokensFromRefreshToken: ExpressHandler = async (
    {cookies},
    response,
) => {
    if (auth.reqHasToken(cookies)) {
        try {
            const result = await getTokens(cookies)

            if (!auth.tokenEndpointIsValid(result)) {
                return response.status(stats.internalError).json({
                    message: "The token fetched from the token endpoint is not valid",
                })
            } else if (cookies.refreshToken === "") {
                return response.status(stats.badRequest).json({
                    message: "Refresh token is empty string, user was signed out",
                })
            }

            const info = jwt.decode(result.id_token) as IdTokenPayload,
                userInfo: UserInfo = {
                    idToken: result.id_token,
                    sub: info.sub,
                    emailVerified: info.email_verified,
                    cognitoUsername: info["cognito:username"],
                    username: info.preferred_username,
                    refreshToken: cookies.refreshToken,
                    accessToken: result.access_token,
                    email: info.email,
                }

            return response.status(stats.ok).json(userInfo)
        } catch (err: unknown) {
            return response.status(stats.internalError).json(
                typeof err === "object" ? err : {message: err},
            )
        }
    }

    return response.status(stats.ok).json({
        message: "Missing token.",
    })
}

export const logout: ExpressHandler = (_, response) => {
    return response
        .cookie("refreshToken", "", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
        .status(stats.ok)
        .json({})
}

export default {
    register,
    login,
    logout,
    getTokensFromRefreshToken,
}
