import React from 'react'
import { makeStyles, AppBar, Typography, Button, Toolbar, TextField, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { signup, signin } from '../redux/actions/auth'

const useStyles = makeStyles(theme => ({
    appBar: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    login: {
        width: '70%'
    }
}))

const NavBar = () => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        email: '',
        password: '',
        newUser: false
    })

    const logIn = () => {
        if (state.newUser) {
            signup(state.email, state.password)
        } else {
            signin(state.email, state.password)
        }
    }

    const handleChange = (event) => {
        setState({ [event.target.id]: event.target.value })
    }

    return (
        <div className={classes.appBar}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography className={classes.title}>
                        Staffo
                    </Typography>
                    <Grid className={classes.login} container direction='row' justify='space-evenly'>
                        <TextField onChange={handleChange} id='email' placeholder='Email' size='small' variant='outlined' />
                        <TextField onChange={handleChange} id='password' placeholder='Password' size='small' variant='outlined' />
                        <Button onClick={logIn} size='small' color="inherit">
                            Login
                        </Button>
                        <Typography variant='h4'>||</Typography>
                        <Button size='small' color='inherit'>
                            Sign-Up
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar