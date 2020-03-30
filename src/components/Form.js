import React from 'react'
import { connect } from 'react-redux'
import { employeeActions } from '../redux/actions/index'
import { Paper, Button, FormGroup, Switch, TextField, Grid, Typography, Snackbar } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { useForm } from 'react-hook-form'
import 'date-fns'
import MomentUtils from '@date-io/moment'
import Alert from '@material-ui/lab/Alert'

function mapDispatchToProps(dispatch) {
    return {
        addEmployee: employee => employeeActions.addEmployee(employee, dispatch)
    }
}

const ConnectedForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()
    const errorsArray = Object.values(errors).map(error => error.message)
    debugger
    const [state, setState] = React.useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        birthDate: new Date().toDateString(),
        startDate: new Date().toDateString(),
        status: true,
        isActive: true,
        sbOpen: true
    })

    React.useEffect(() => {
        setState({ sbOpen: true })
    }, [errors])

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }

    const handleBirthDateChange = (date) => {
        date === null
            ? setState({...state, birthDate: new Date().toDateString()})
            : setState({...state,birthDate: date._d.toDateString() })
    }

    const handleStartDateChange = (date) => {
        date === null
            ? setState({...state, startDate: new Date().toDateString()})
            : setState({...state, startDate: date._d.toDateString() })
    }

    const handleToggle = (event) => {
        setState({ ...state, status: event.target.checked })
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

    const handleUpdateSubmit = () => {
        const { id, firstName, middleInitial, lastName, birthDate, startDate, status } = state
        props.addEmployee({ 
            id,
            firstName, 
            middleInitial, 
            lastName, 
            birthDate, 
            startDate, 
            status 
        })
        setState({ 
            firstName: firstName,
            middleInitial: middleInitial,
            lastName: lastName,
            birthDate: birthDate,
            startDate: startDate,
            status: status
         })
        props.toggle()
    }

    return (
        <Paper style={{ padding: '20px'}}>
            <FormGroup>
                <Grid container justify='space-evenly' style={{ width: '80%', margin: 'auto'}}>
                <TextField 
                        error={ errors.firstName ? true : false }
                        inputRef={ 
                            register({ 
                                required: 'First Name Required', 
                                maxLength: {
                                    value: 50,
                                    message: 'First Name must be less than 50 characters'
                                },
                                minLength: {
                                    value: 1,
                                    message: 'First Name must be at least 1 letter'
                                },
                                pattern: {
                                    value: /[a-zA-Z]/,
                                    message: 'First Name must only include letters'
                                }
                            })
                        } 
                        onChange={handleChange} 
                        required 
                        name='firstName'
                        id='firstName' 
                        label='First Name' 
                        placeholder='First Name' 
                        variant='outlined' 
                        size='small' 
                    />
                    <TextField 
                        error={ errors.middleInitial ? true : false }
                        inputRef={ 
                            register({ 
                                maxLength: 1, 
                                pattern: {
                                    value: /[a-z][A-Z]/, 
                                    message: 'Middle Initial must be a letter'
                                } 
                            })
                        } 
                        onChange={handleChange} 
                        name='middleInitial'
                        id='middleInitial' 
                        label='M.I.' 
                        placeholder='M.I.' 
                        variant='outlined' 
                        size='small' 
                    />
                    <TextField 
                        error={ errors.lastName ? true : false }
                        inputRef={ 
                            register({ 
                                required: 'Last Name Required', 
                                maxLength: {
                                    value: 50, 
                                    message: 'Last Name must be less than 50 characters'
                                },
                                minLength: {
                                    value: 1,
                                    message: 'Last Name must be at least 1 letter'
                                },
                                pattern: {
                                    value: /[a-z][A-Z]/, 
                                    message: 'Last Name must only include letters'
                                } 
                        })
                    } 
                        onChange={handleChange} 
                        required 
                        name='lastName'
                        id='lastName' 
                        label='Last Name' 
                        placeholder='Last Name'
                        variant='outlined' 
                        size='small' 
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            error={ errors.birthDate ? true : false }
                            inputRef={ register({ required: true })} 
                            margin="normal"
                            id="birthDate"
                            label="Date of Birth"
                            format="MM/DD/YYYY"
                            value={state.birthDate}
                            onChange={handleBirthDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardDatePicker
                            error={ errors.startDate ? true : false }
                            inputRef={ register({ required: true })} 
                            margin="normal"
                            id="startDate"
                            label="Date of Employment"
                            format="MM/DD/YYYY"
                            value={state.startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <Grid item container direction='row' xs={6}>
                            <Typography>Inactive</Typography>
                            <Switch checked={state.status} onChange={handleToggle} value='isActive' />
                            <Typography>Active</Typography>
                        </Grid>
                        <Button onClick={handleSubmit(handleUpdateSubmit)} variant='contained' color='primary'>Save Employee</Button>
                    </MuiPickersUtilsProvider>
                </Grid>
            </FormGroup>
            {errorsArray.length > 0
                ?   <Snackbar 
                        open={state.sbOpen}
                        autoHideDuration={3000} 
                        onClose={handleSBClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <Alert severity="error">
                            <div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
                            { handleSnackbar(errors) }
                            </div>
                        </Alert>
                    </Snackbar>
                : null
            }
        </Paper>
    )
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form