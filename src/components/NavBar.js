import React from 'react'
import { makeStyles, ThemeProvider, createMuiTheme, AppBar, Typography, Button, Toolbar, TextField, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { signup, signin, signout } from '../redux/actions/auth'

import { blue, red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
    appBar: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    login: {
        width: '70%'
    },
    textField:  {
        marginRight: '5px'
    }
}))

const theme = createMuiTheme({
    palette: {
      primary: blue,
      secondary: {
          main: '#bbdefb'
      }
    },
  })

const NavBar = ({ signup, signin, signout, auth, authMsg }) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        email: '',
        password: '',
        newUser: false
    })

    React.useEffect(() => {
        debugger
        if (state.newUser) {
            logIn()
        }
    }, [state.newUser])

    const handleSignup = () => {
        setState({ ...state, newUser: !state.newUser})
    }

    const logOut = () => {
        signout()
    }

    const logIn = () => {
        debugger
        if (state.newUser) {
            signup(state.email, state.password)
        } else {
            signin(state.email, state.password)
        }
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }

    return (
        <div className={classes.appBar}>
            <ThemeProvider theme={theme}>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography className={classes.title}>
                            Staffo
                        </Typography>
                        <Grid className={classes.login} container direction='row' justify='flex-end'>
                            {!auth.isEmpty
                                ? <>
                                    <Button onClick={logOut} size='small' color='inherit'>
                                        Logout
                                    </Button>
                                </>
                                : <>
                                    
                                    <TextField className={classes.textField} onChange={handleChange} id='email' label='Email' size='small' variant='outlined' color='secondary' />
                                    <TextField className={classes.textField} onChange={handleChange} id='password' label='Password' size='small' variant='outlined' color='secondary' />
                                    <Button onClick={logIn} size='small' color="inherit">
                                        Login
                                    </Button>
                                    <Typography variant='h4'>||</Typography>
                                    <Button onClick={handleSignup} size='small' color='inherit'>
                                        Sign-Up
                                    </Button>
                                </>
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    )
}

function mapStateToProps(state) {
    return {
      authMsg: state.authReducer.authMsg,
      auth: state.firebaseReducer.auth
    }
  }

function mapDispatchToProps(dispatch) {
return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) =>
    dispatch(signin(email, password, callback)),
    signout: () => dispatch(signout())
};
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)