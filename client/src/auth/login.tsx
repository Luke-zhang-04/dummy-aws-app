import "./style.scss"
import {Button, FormControl, Grid, TextField} from "@material-ui/core"
import React from "react"
import {login} from "../auth-utils"

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

declare namespace Login {
    export interface Props {
        stateToggle: React.Dispatch<React.SetStateAction<string>>,
    }

    export interface State {
        username: string,
        password: string,
    }
}

export default class Login extends React.Component<Login.Props, Login.State> {

    public constructor (props: Login.Props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }
    }

    private _login = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault()

        try {
            await login(this.state.username, this.state.password)
        } catch (err) {
            alert(err.message ? err.message : err)
        }

        console.log(this.state)
    }

    private _form = (): JSX.Element => <form onSubmit={this._login}>
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
