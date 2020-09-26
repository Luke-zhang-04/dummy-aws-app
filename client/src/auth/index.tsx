import React from "react"

export const Auth = (): JSX.Element => {
    const [authState, setAuth] = React.useState("auth")

    return authState === "login"
        ? <div onClick={() => setAuth("reg")}>LOGIN</div>
        : <div onClick={() => setAuth("login")}>REGISTER</div>
}

export default Auth
