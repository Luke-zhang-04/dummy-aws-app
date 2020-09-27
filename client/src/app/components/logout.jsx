import Button from "@material-ui/core/Button"
import React from "react"
import {UserContext} from "../.."

const logoutButton = () => <UserContext.Consumer>
    {({setUser}) => (
        <Button
            onClick={() => setUser(undefined)}
            variant="contained"
            color="primary"
        >Logout</Button>
    )}
</UserContext.Consumer>

export default React.memo(logoutButton)
