import Login from "./login"
import React from "react"
import Reg from "./reg"

export const Auth = (): JSX.Element => {
    const [authState, setAuth] = React.useState("login")

    return authState === "login"
        ? <Login stateToggle={setAuth}/>
        : <Reg stateToggle={setAuth}/>
}

export default React.memo(Auth)
