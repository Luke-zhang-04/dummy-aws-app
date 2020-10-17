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
import {Button, FormControl, Grid, TextField} from "@material-ui/core"
import {CognitoUser, isAwsErrorObject, isCognitoUser} from "../cognito-utils"
import React from "react"
import UserContext from "../userContext"
import {url} from "../globals"

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

declare namespace Login {

    export interface Props {
        stateToggle: React.Dispatch<React.SetStateAction<string>>,
    }

    export interface State {
        email: string,
        password: string,
    }

    export type UserSetter = (usr?: CognitoUser)=> void

}

export default class Login extends React.Component<Login.Props, Login.State> {

    public constructor (props: Login.Props) {
        super(props)

        this.state = {
            email: "",
            password: "",
        }
    }

    private _login = async (
        event: React.FormEvent,
        setUser: Login.UserSetter,
    ): Promise<void> => {
        event.preventDefault()

        try {
            const user = await(await fetch(
                `${url}/auth/login`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        password: this.state.password,
                    }),
                },
            )).json() as {[key: string]: unknown}

            if (isCognitoUser(user)) {
                setUser(user)

                return
            }

            throw user
        } catch (err: unknown) {
            alert(isAwsErrorObject(err) || err instanceof Error ? err.message : err)
            console.log(err)
        }
    }

    private _form = (): JSX.Element => <UserContext.Consumer>
        {({setUser}): JSX.Element => (
            <form onSubmit={(event): Promise<void> => this._login(event, setUser)}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        style={{marginTop: "1rem"}}
                        label="Email"
                        type="email"
                        onChange = {(event): void => (
                            this.setState({email: event.target.value})
                        )}
                    />
                    <TextField
                        fullWidth
                        style={{marginTop: "1rem"}}
                        label="Password"
                        type="password"
                        onChange = {(event): void => (
                            this.setState({password: event.target.value})
                        )}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{marginTop: "1rem"}}
                        className="btn"
                    >Sign In</Button>
                </FormControl>
            </form>
        )}
    </UserContext.Consumer>

    public render = (): JSX.Element => <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: "100vh"}}
    >
        {React.createElement(this._form)}
        <p
            style={{marginTop: "3rem"}}
            className="link"
            onClick={(): void => this.props.stateToggle("reg")}
        >
            Don&apos;t have an account? Register!
        </p>
    </Grid>

}
