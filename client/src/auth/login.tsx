import "./style.scss"
import {Button, FormControl, Grid, TextField} from "@material-ui/core"
import {isAwsErrorObject, login, userPool} from "../auth-utils"
import type {CognitoUser} from "amazon-cognito-identity-js"
import React from "react"
import {UserContext} from "../"

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */

declare namespace Login {

    export interface Props {
        stateToggle: React.Dispatch<React.SetStateAction<string>>,
    }

    export interface State {
        username: string,
        password: string,
    }

    export type UserSetter = (usr?: CognitoUser)=> void
    
}

export default class Login extends React.Component<Login.Props, Login.State> {

    public constructor (props: Login.Props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }
    }

    private _register = async (
        event: React.FormEvent,
        setUser: Login.UserSetter,
    ): Promise<void> => {
        event.preventDefault()

        try {
            await login(this.state.username, this.state.password)
        } catch (err) {
            alert(isAwsErrorObject(err) ? err.message : err)
            console.log(err)

            return
        }

        alert("Success!")
        setUser(userPool.getCurrentUser() ?? undefined)
    }

    private _form = (): JSX.Element => <UserContext.Consumer>
        {({setUser}): JSX.Element => (
            <form onSubmit={(event): Promise<void> => this._register(event, setUser)}>
                <FormControl fullWidth>
                    <TextField
                        fullWidth
                        style={{marginTop: "1rem"}}
                        label="Email"
                        type="email"
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
