import * as serviceWorker from "./serviceWorker"
import {CognitoUser, isCognitoUser} from "./cognito-utils"
import Application from "./app"
import Auth from "./auth"
import React from "react"
import ReactDOM from "react-dom"
import {url} from "./globals"

declare namespace App {
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

export const UserContext = React.createContext<App.Context>({
    currentUser: undefined,
    setUser: () => undefined,
})

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
        console.log(user)
        if (user === undefined || user === null) {
            console.log("fetching")
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

            console.log(localStorage, user, "BEFORE")

            localStorage.setItem("loggedin", "false")

            console.log(localStorage, user, "AFTER")
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

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById("root"),
)

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
