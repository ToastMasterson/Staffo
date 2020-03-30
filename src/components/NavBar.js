import React from 'react'
import { makeStyles, ThemeProvider, createMuiTheme, AppBar, Typography, Button, Toolbar, TextField, Grid, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux'
import { signup, signin, signout } from '../redux/actions/auth'

import { useForm } from 'react-hook-form'

import { blue } from '@material-ui/core/colors'

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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  

const NavBar = ({ signup, signin, signout, auth, authMsg }) => {
    const classes = useStyles()
    const { register, handleSubmit, errors } = useForm()
    let errorsArray = Object.values(errors)
    debugger
    const [state, setState] = React.useState({
        email: '',
        password: '',
        newUser: false,
        sbOpen: true
    })

    React.useEffect(() => {
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
        if (state.newUser) {
            signup(state.email, state.password)
        } else {
            signin(state.email, state.password)
        }
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }

    const handleSnackbar = (errors) => (
        Object.values(errors).map(error => <div>{error.message}</div>)
    )
    
    const handleSBClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setState({ ...state, sbOpen: false })
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
                                    <TextField 
                                        error={ errors.email ? true : false } 
                                        className={classes.textField} 
                                        inputRef={ 
                                            register({ 
                                                required: "Email is Required", 
                                                maxLength: { 
                                                    value: 50, 
                                                    message: 'Email must be less than 50 characters'
                                                } 
                                            })
                                        } 
                                        onChange={ handleChange } 
                                        name='email' 
                                        id='email' 
                                        label={ errors.email ? "Email Required" : 'Email' } 
                                        size='small' variant='outlined' color='secondary' 
                                    />
                                    <TextField 
                                        error={ errors.password ? true : false } 
                                        className={classes.textField} 
                                        inputRef={ 
                                            register({ 
                                                required: "Password Required", 
                                                maxLength: { 
                                                    value: 20,
                                                    message: "Password must be less than 20 characters"
                                                }
                                            })
                                        }
                                        onChange={handleChange} 
                                        name='password'
                                        id='password' 
                                        label={ errors.password ? 'Password Required' : 'Password' }
                                        size='small' variant='outlined' color='secondary' 
                                    />
                                    <Button onClick={handleSubmit(logIn)} size='small' color="inherit">
                                        Login
                                    </Button>
                                    <Typography variant='h4'>||</Typography>
                                    <Button onClick={handleSignup} size='small' color='inherit'>
                                        Sign-Up
                                    </Button>
                                </>
                            }
                        </Grid>
                        {errorsArray.length > 0
                            ?   <Snackbar 
                                    open={state.sbOpen}
                                    autoHideDuration={4000} 
                                    onClose={handleSBClose}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                >
                                    <Alert onClose={handleSBClose} severity="error">
                                        <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                                        { handleSnackbar(errors) }
                                        </div>
                                    </Alert>
                                </Snackbar>
                            : null
                        }
                        
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