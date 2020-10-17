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

import Login from "./login"
import React from "react"
import Reg from "./reg"

export const Auth = () => {
    const [authState, setAuth] = React.useState("login")

    return authState === "login"
        ? <Login stateToggle={setAuth}/>
        : <Reg stateToggle={setAuth}/>
}

export default React.memo(Auth)
