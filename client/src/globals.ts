export const url = process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3333"
    : "https://6lnooio7f6.execute-api.us-east-1.amazonaws.com/prod"

export default {
    url,
}
