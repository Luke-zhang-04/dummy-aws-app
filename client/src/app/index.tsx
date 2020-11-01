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

import "./style.scss"
import {App as Root} from "../"
import ListItem from "./components/listItem"
import {Grid, List} from "@material-ui/core"
import LogoutBtn from "./components/logout"
import React from "react"
import UserContext from "../userContext"


declare namespace App {

    export interface Props {}

    export interface State {
        completed: TodoItems["items"],
        incomplete: TodoItems["items"],
    }

    export type TodoItems = {
        items: {
            id: number,
            title: string,
            description: string,
            completed: 1 | 0,
            uid: string,
        }[],
    }

}

const isTodoItems = (obj: {[key: string]: unknown}): obj is App.TodoItems => (
    obj.items instanceof Array &&
    "id" in obj.items[0] &&
    "title" in obj.items[0] &&
    "description" in obj.items[0] &&
    "completed" in obj.items[0]
)

export default class App extends React.Component<App.Props, App.State> {

    public static contextType = UserContext

    public constructor (props: App.Props) {
        super(props)

        this.state = {
            completed: [],
            incomplete: [],
        }
    }

    public componentDidMount = async () => {
        const todoItems = await (await fetch(
            `http://127.0.0.1:3333/todo/getItems?idToken=${(this.context as Root.Context).currentUser?.idToken}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        )).json()

        if (isTodoItems(todoItems)) {
            for (const item of todoItems.items) {
                if (item.completed === 0) {
                    this.state.completed.push(item)
                } else {
                    this.state.incomplete.push(item)
                }
            }

            this.setState({})
        }
    }

    public render = (): JSX.Element => <>
        <LogoutBtn/>
        <Grid item xs={12} className="container">
            <h1>Todo</h1>
            <List>{
                this.state.completed.map((val, index) => (
                    <ListItem
                        title={val.title}
                        desc={val.description}
                        complete={false}
                        key={`TODO-list-item-${index}`}
                    />
                ))
            }</List>
        </Grid>

        <Grid item xs={12} className="container">
            <h1>Done</h1>
            <List>{
                this.state.incomplete.map((val, index) => (
                    <ListItem
                        title={val.title}
                        desc={val.description}
                        complete={false}
                        key={`TODO-list-item-${index}`}
                    />
                ))
            }</List>
        </Grid>
    </>

}
