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

import Button from "@material-ui/core/Button"
import React from "react"
import {UserContext} from "../.."

const logoutButton = () => <UserContext.Consumer>
    {({setUser}) => (
        <Button
            onClick={() => setUser(undefined)}
            variant="contained"
            color="primary"
        >Logout</Button>
    )}
</UserContext.Consumer>

export default React.memo(logoutButton)
