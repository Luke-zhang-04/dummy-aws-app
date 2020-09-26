import * as serviceWorker from "./serviceWorker"
import Auth from "./auth"
import React from "react"
import ReactDOM from "react-dom"

declare namespace App {
    export interface Props {}

    export interface State {
        isAuthenticated: boolean,
    }
}

class App extends React.Component<App.Props, App.State> {

    public constructor (props: App.Props) {
        super(props)

        this.state = {
            isAuthenticated: false,
        }
    }

    public render = (): JSX.Element => {
        if (this.state.isAuthenticated) {
            return <div>AUTHENTICATED</div>
        }

        return <Auth/>
    }

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
