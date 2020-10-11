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
    typeof obj.emailVerified ==="boolean" &&
    typeof obj.cognitoUsername === "string" &&
    typeof obj.username === "string" &&
    typeof obj.email === "string" &&
    typeof obj.refreshToken === "string" &&
    typeof obj.accessToken === "string"
)
