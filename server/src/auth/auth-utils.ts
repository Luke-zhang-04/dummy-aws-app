import * as AwsCognito from "amazon-cognito-identity-js"

/* eslint-disable @typescript-eslint/naming-convention */

type AwsErrorObject = {
    code: string,
    name: string,
    message: string,
}

interface LoginParams {
    [key: string]: string,
    email: string,
    password: string,
}

interface RegisterParams extends LoginParams {
    username: string,
}

export type TokenRequest = {
    refreshToken: string,
}

/* eslint-disable camelcase */
type TokenEnpointResult = {
    id_token: string,
    access_token: string,
    expires_in: number,
    token_type: "Bearer",
}
/* eslint-enable camelcase */

if (process.env.UserPoolId === undefined || process.env.ClientId === undefined) {
    throw new Error("UserPoolId or ClientId are undefined from env")
}

const poolData = {
    UserPoolId: process.env.UserPoolId,
    ClientId: process.env.ClientId,
}

export const userPool = new AwsCognito.CognitoUserPool(poolData)


export const isAwsErrorObject = (
    obj: {[key: string]: string},
): obj is AwsErrorObject => (
    typeof obj.code === "string" &&
    typeof obj.message === "string" &&
    typeof obj.name === "string"
)

export const hasValidRegisterParams = (
    obj: {[key: string]: string},
): obj is RegisterParams => (
    typeof obj.email === "string" &&
    typeof obj.password === "string" &&
    typeof obj.username === "string"
)

export const hasValidLoginParams = (
    obj: {[key: string]: string},
): obj is LoginParams => (
    typeof obj.email === "string" && typeof obj.password === "string"
)

export const reqHasToken = (
    obj: {[key: string]: string},
): obj is TokenRequest => (
    typeof obj.refreshToken === "string"
)

export const tokenEndpointIsValid = (
    obj: {[key: string]: unknown},
): obj is TokenEnpointResult => (
    typeof obj.id_token === "string" &&
    typeof obj.access_token === "string" &&
    typeof obj.expires_in === "number" &&
    obj.token_type === "Bearer"
)

/**
 * Register a user. Promise based 😀
 * @param username - username
 * @param email - email
 * @param password - password
 * @returns - Promise with Cognito user
 */
export const register = (
    username: string,
    email: string,
    password: string,
): Promise<AwsCognito.CognitoUser> => {
    const attributeList = [
        new AwsCognito.CognitoUserAttribute({
            Name: "preferred_username",
            Value: username,
        }),
        new AwsCognito.CognitoUserAttribute({
            Name: "email",
            Value: email,
        }),
    ]

    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, attributeList, [], (err, result) => {
            if (err) {
                reject(err)
            }

            resolve(result?.user)
        })
    })
}

export const login = (
    email: string,
    password: string,
): Promise<AwsCognito.CognitoUserSession | Error> => (
    new Promise((resolve, reject) => {
        const authDetails = new AwsCognito.AuthenticationDetails({
                Username: email,
                Password: password,
            }),
            userData = {
                Username: email,
                Pool: userPool,
            },
            cognitoUser = new AwsCognito.CognitoUser(userData)

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                resolve(result)
            },
            onFailure: (err) => {
                reject(err)
            },
        })
    }))

export default {
    register,
    login,
    isAwsErrorObject,
    hasValidLoginParams,
    hasValidRegisterParams,
    tokenEndpointIsValid,
    reqHasToken,
    userPool,
}
