import React from 'react'
import { makeStyles, AppBar, Typography, Button, Toolbar, TextField, Grid } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    appBar: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    login: {
        width: '60%'
    }
}))

const NavBar = () => {
    const classes = useStyles()

    return (
        <div className={classes.appBar}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title}>
                        Staffo
                    </Typography>
                    <Grid className={classes.login} container direction='row' justify='space-evenly'>
                        <TextField id='email' placeholder='Email' size='small' variant='outlined' />
                        <TextField id='password' placeholder='Password' size='small' variant='outlined' />
                        <Button size='small' color="inherit">
                            Login
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar