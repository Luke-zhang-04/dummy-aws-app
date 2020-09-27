import * as serviceWorker from "./serviceWorker"
import Application from "./app"
import Auth from "./auth"
import type {CognitoUser} from "amazon-cognito-identity-js"
import React from "react"
import ReactDOM from "react-dom"
import {userPool} from "./auth-utils"

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

    public componentDidMount = (): void => {
        this.setUser(userPool.getCurrentUser() ?? undefined)
    }

    public setUser = (user?: CognitoUser): void => {
        this.state.currentUser?.signOut()

        this.setState({
            isAuthenticated: !(user === undefined || user === null),
            currentUser: user,
        })

        console.log("UPDATED USER")
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
    document.getElementById("root")
)

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister()
