import React from 'react'
import { makeStyles, AppBar, Typography, Button, Toolbar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    appBar: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
}))

const NavBar = () => {
    const classes = useStyles()

    return (
        <div className={classes.appBar}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title}>
                        Staff-o
                    </Typography>
                    <Button color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar