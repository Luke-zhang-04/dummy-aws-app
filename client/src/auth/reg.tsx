import "./style.scss"
import {Button, FormControl, Grid, TextField} from "@material-ui/core"
import React from "react"
import {register} from "../auth-utils"

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

    private _register = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()

        try {
            if (this.state.password !== this.state.password2) {
                throw new Error("Passwords don't match")
            }
            await register(
                this.state.username,
                this.state.email,
                this.state.password,
            )
        } catch (err) {
            alert(err.message ? err.message : err)
        }

        console.log(this.state)
    }

    private _form = (): JSX.Element => <form onSubmit={this._register}>
        <FormControl fullWidth>
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
        </FormControl>
    </form>

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
