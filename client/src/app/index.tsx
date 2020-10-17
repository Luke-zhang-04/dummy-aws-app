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
