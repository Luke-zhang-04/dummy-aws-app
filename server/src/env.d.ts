// eslint-disable-next-line
/// <reference types="node" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly DB_PASSWORD: string,
        readonly PORT: "default" | string,
        readonly UserPoolId: string,
        readonly ClientId: string,
    }
}
