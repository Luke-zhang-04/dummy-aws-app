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

export type AwsErrorObject = {
    code: string,
    name: string,
    message: string,
}

export const isAwsErrorObject = (
    obj: unknown,
): obj is AwsErrorObject => (
    typeof obj === "object" &&
    typeof (obj as {[key: string]: unknown})?.code === "string" &&
    typeof (obj as {[key: string]: unknown})?.name === "string" &&
    typeof (obj as {[key: string]: unknown})?.message === "string"
)

export type CognitoUser = {
    idToken: string,
    sub: string,
    emailVerified: boolean,
    cognitoUsername: string,
    username: string,
    email: string,
    refreshToken: string,
    accessToken: string,
}

export const isCognitoUser = (
    obj: {[key: string]: unknown},
): obj is CognitoUser => (
    typeof obj.idToken === "string" &&
    typeof obj.sub === "string" &&
    typeof obj.emailVerified === "boolean" &&
    typeof obj.cognitoUsername === "string" &&
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    typeof obj.refreshToken === "string" &&
    typeof obj.accessToken === "string"
)
