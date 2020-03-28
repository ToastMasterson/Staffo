import React from 'react'
import { connect } from 'react-redux'
import { employeeActions } from '../redux/actions/index'
import { Paper, Button, FormGroup, Switch, TextField, Grid, Typography } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { useForm } from 'react-hook-form'
import 'date-fns'
import MomentUtils from '@date-io/moment'

function mapDispatchToProps(dispatch) {
    return {
        addEmployee: employee => employeeActions.addEmployee(employee, dispatch)
    }
}

const ConnectedForm = (props) => {
    const { register, handleSubmit, watch, errors } = useForm()

    const [state, setState] = React.useState({
        firstName: '',
        middleInitial: '',
        lastName: '',
        birthDate: new Date().toDateString(),
        startDate: new Date().toDateString(),
        status: true,
        isActive: true
    })

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
                        inputRef={ register({ required: true, maxLength: 50, minLength: 1 })} 
                        onChange={handleChange} 
                        required 
                        name='firstName'
                        id='firstName' 
                        label='First Name' 
                        defaultValue='First Name' 
                        variant='outlined' 
                        size='small' 
                    />
                    <TextField 
                        error={ errors.middleInitial ? true : false }
                        inputRef={ register({ maxLength: 1 })} 
                        onChange={handleChange} 
                        name='middleInitial'
                        id='middleInitial' 
                        label='M.I.' 
                        defaultValue='M.I.' 
                        variant='outlined' 
                        size='small' 
                    />
                    <TextField 
                        error={ errors.lastName ? true : false }
                        inputRef={ register({ required: true, maxLength: 50, minLength: 1 })} 
                        onChange={handleChange} 
                        required 
                        name='lastName'
                        id='lastName' 
                        label='Last Name' 
                        defaultValue='Last Name'
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
        </Paper>
    )
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form