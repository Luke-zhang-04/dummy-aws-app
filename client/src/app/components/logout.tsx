import Button from "@material-ui/core/Button"
import React from "react"
import {UserContext} from "../../"

const logoutButton = (): JSX.Element => <UserContext.Consumer>
    {({setUser}): JSX.Element => (
        <Button
            onClick={(): void => setUser(undefined)}
            variant="contained"
            color="primary"
        >Logout</Button>
    )}
</UserContext.Consumer>

export default React.memo(logoutButton)
