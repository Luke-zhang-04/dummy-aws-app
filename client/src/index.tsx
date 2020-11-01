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

import "./index.scss"
import * as serviceWorker from "./serviceWorker"
import {CognitoUser, isCognitoUser} from "./cognito-utils"
import {CssBaseline, ThemeProvider, createMuiTheme} from "@material-ui/core"
import Application from "./app"
import Auth from "./auth"
import React from "react"
import ReactDOM from "react-dom"
import UserContext from "./userContext"
import {url} from "./globals"

export declare namespace App {
    export interface Props {}

    export interface State {
        isAuthenticated: boolean,
        currentUser?: CognitoUser,
    }

    export interface Context {
        currentUser: undefined | CognitoUser,
        setUser: (user: Context["currentUser"])=> void,
    }
}

class App extends React.Component<App.Props, App.State> {

    public constructor (props: App.Props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            currentUser: undefined,
        }
    }

    public componentDidMount = async (): Promise<void> => {
        if (localStorage.getItem("loggedin") === "true") {
            const user = await (await fetch(
                `${url}/auth/tokens`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )).json() as {[key: string]: unknown}

            if (isCognitoUser(user)) {
                this.setUser(user)

                return
            }

            this.setUser(undefined)

            return
        }

        this.setUser(undefined)
    }

    public setUser = async (user?: CognitoUser): Promise<void> => {
        if (user === undefined || user === null) {
            await fetch(
                `${url}/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            )

            localStorage.setItem("loggedin", "false")
        } else {
            localStorage.setItem("loggedin", "true")
        }

        this.setState({
            isAuthenticated: !(user === undefined || user === null),
            currentUser: user,
        })
    }

    public render = (): JSX.Element => (
        <UserContext.Provider
            value={{
                currentUser: this.state.currentUser,
                setUser: this.setUser,
            }}
        >
            {
                this.state.isAuthenticated
                    ? <Application/>
                    : <Auth/>
            }
        </UserContext.Provider>
    )

}

const theme = createMuiTheme({
    palette: {
        background: {
            default: "#3737373",
        },
        type: "dark",
        text: {
            primary: "#f4f4f4",
            secondary: "#aaa",
        },
    },
})

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root"),
)

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
