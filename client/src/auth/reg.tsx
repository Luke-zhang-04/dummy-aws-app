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
import {UserContext} from "../"
import {url} from "../globals"

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */


declare namespace Reg {

    export interface Props {
        stateToggle: React.Dispatch<React.SetStateAction<string>>,
    }

    export interface State {
        username: string,
        email: string,
        password: string,
        password2: string,
    }

    export type UserSetter = (usr?: CognitoUser)=> void

}

export default class Reg extends React.Component<Reg.Props, Reg.State> {

    public constructor (props: Reg.Props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            password2: "",
        }
    }

    private _register = async (
        event: React.FormEvent,
        setUser: Reg.UserSetter,
    ): Promise<void> => {
        event.preventDefault()

        try {
            if (this.state.password !== this.state.password2) {
                throw new Error("Passwords don't match")
            }

            const user = await(await fetch(
                `${url}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        email: this.state.email,
                        password: this.state.password,
                    }),
                },
            )).json() as {[key: string]: unknown}

            if (isCognitoUser(user)) {
                alert("Success! Please confirm your email and log in again.")
                setUser(user)

                return
            }

            throw user
        } catch (err: unknown) {
            alert(isAwsErrorObject(err) || err instanceof Error ? err.message : err)
            console.log(err)
        }
    }

    private _formContents = (): JSX.Element => <>
        <TextField
            fullWidth
            style={{marginTop: "1rem"}}
            label="Username"
            type="text"
            onChange = {(event): void => (
                this.setState({username: event.target.value})
            )}
        />
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
        <TextField
            fullWidth
            style={{marginTop: "1rem"}}
            label="Confirm Password"
            type="password"
            onChange = {(event): void => (
                this.setState({password2: event.target.value})
            )}
        />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop: "1rem"}}
            className="btn"
        >Register</Button>
    </>

    private _form = (): JSX.Element => <UserContext.Consumer>
        {({setUser}): JSX.Element => (
            <form onSubmit={(event): Promise<void> => this._register(event, setUser)}>
                <FormControl fullWidth>
                    {React.createElement(this._formContents)}
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
            onClick={(): void => this.props.stateToggle("login")}
        >
            Already have an account? Login!
        </p>
    </Grid>

}
