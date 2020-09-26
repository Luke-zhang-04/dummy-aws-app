import * as AwsCognito from "amazon-cognito-identity-js"

/* eslint-disable @typescript-eslint/naming-convention */

const poolData = {
        UserPoolId: "us-east-1_D5RIlJnLy",
        ClientId: "6jmd48v6vv36mfoj9vn65t6c3f",
    },
    userPool = new AwsCognito.CognitoUserPool(poolData)

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
            Name: "name",
            Value: username,
        }),
        new AwsCognito.CognitoUserAttribute({
            Name: "email",
            Value: email,
        }),
    ]

    return new Promise((resolve, reject) => {
        userPool.signUp(username, password, attributeList, [], (err, result) => {
            if (err) {
                reject(err)
            }

            resolve(result?.user)
        })
    })
}

export const login = (
    username: string,
    password: string
): Promise<AwsCognito.CognitoUserSession | Error> => (
    new Promise((resolve, reject) => {
        const authDetails = new AwsCognito.AuthenticationDetails({
                Username: username,
                Password: password,
            }),
            userData = {
                Username: username,
                Pool: userPool
            },
            cognitoUser = new AwsCognito.CognitoUser(userData)

        cognitoUser.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log(result)
                resolve(result)
            },
            onFailure: (err) => {
                console.log(err)
                reject(err)
            },
        })
    }))

export default {
    register,
    login,
}
