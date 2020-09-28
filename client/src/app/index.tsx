import ListItem from "./components/listItem"
import LogoutBtn from "./components/logout"
import React from "react"

declare namespace App {

    export interface Props {}

    export interface State {
        items: string[],
    }

}

export default class App extends React.Component<App.Props, App.State> {

    public constructor (props: App.Props) {
        super(props)

        this.state = {
            items: [],
        }
    }

    public render = (): JSX.Element => <>
        <LogoutBtn/>
        {
            this.state.items.map((val, index) => (
                <ListItem title={val} key={`TODO-list-item-${index}`}/>
            ))
        }
    </>

}
