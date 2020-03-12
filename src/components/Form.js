import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addEmployee } from '../redux/actions/index'
import { Paper, Button, FormGroup, FormControlLabel, Switch, TextField, Grid, Typography } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
  import 'date-fns'
  import MomentUtils from '@date-io/moment'

function mapDispatchToProps(dispatch) {
    return {
        addEmployee: employee => dispatch(addEmployee(employee))
    }
}

class ConnectedForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            middleInitial: '',
            lastName: '',
            birthDate: new Date(),
            startDate: new Date(),
            status: true,
            isActive: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleDateChange(date) {
        this.setState({ birthDate: date._d })
    }

    handleToggle(event) {
        this.setState({ isActive: event.target.checked })
    }

    handleSubmit(event) {
        event.preventDefault()
        const { firstName, middleInitial, lastName, birthDate, startDate, status } = this.state
        this.props.addEmployee({ 
            firstName, 
            middleInitial, 
            lastName, 
            birthDate: birthDate.toDateString(), 
            startDate: startDate.toDateString(), 
            status 
        })
        this.setState({ 
            firstName: firstName,
            middleInitial: middleInitial,
            lastName: lastName,
            birthDate: birthDate.toDateString(),
            startDate: startDate.toDateString(),
            status
         })
    }

    render() {
        return (
            <Paper style={{ padding: '20px'}}>
                <FormGroup>
                    <Grid container justify='space-evenly' style={{ width: '80%', margin: 'auto'}}>
                        <TextField onChange={this.handleChange} required id='firstName' label='First Name' defaultValue='First Name' variant='outlined' size='small' />
                        <TextField onChange={this.handleChange} id='middleInitial' label='M.I.' defaultValue='M' variant='outlined' size='small' />
                        <TextField onChange={this.handleChange} required id='lastName' label='Last Name' defaultValue='Last Name' variant='outlined' size='small' />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="birthDate"
                                label="Date of Birth"
                                format="MM/DD/YYYY"
                                value={this.state.birthDate}
                                onChange={this.handleDateChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="startDate"
                                label="Date of Employment"
                                format="MM/DD/YYYY"
                                value={this.state.startDate}
                                onChange={this.handleChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                            />
                            <Grid item container direction='row' xs={6}>
                                <Typography>Inactive</Typography>
                                <Switch checked={this.state.isActive} onChange={this.handleToggle} value='isActive' />
                                <Typography>Active</Typography>
                            </Grid>
                            <Button onClick={this.handleSubmit} variant='contained' color='primary'>Save Employee</Button>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </FormGroup>
            </Paper>
        )
    }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form