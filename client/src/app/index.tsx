import LogoutBtn from "./components/logout"
import React from "react"

declare namespace App {

    export interface Props {}

    export interface State {}
    
}

export default class App extends React.Component<App.Props, App.State> {

    public render = (): JSX.Element => <>
        <LogoutBtn/>
    </>

}
