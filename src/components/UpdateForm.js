import React from 'react'
import { connect } from 'react-redux'
import { updateEmployee } from '../redux/actions/index'
import { makeStyles, Modal, Backdrop, Fade, FormGroup, Grid, TextField, Typography, Switch, Button } from '@material-ui/core'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '60%'
    }
}))

const mapDispatchToProps = dispatch => {
    return {
        updateEmployee: employee => dispatch(updateEmployee(employee))
    }
}

const UpdateForm = (props) => {
    const classes = useStyles()

    const [state, setState] = React.useState({
        id: props.employee.id,
        firstName: props.employee.firstName,
        middleInitial: props.employee.middleInitial,
        lastName: props.employee.lastName,
        birthDate: props.employee.birthDate,
        startDate: props.employee.startDate,
        status: props.employee.status,
    })

    const handleChange = (event) => {
        setState({ ...state, [event.target.id]: event.target.value })
    }

    const handleDateChange = (date) => {
        setState({ ...state, birthDate: date._d.toDateString() })
    }
    
    const handleToggle = (event) => {
        setState({ ...state, status: event.target.checked })
    }

    const handleSubmit = () => {
        const { id, firstName, middleInitial, lastName, birthDate, startDate, status } = state
        props.updateEmployee({ 
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
        <Modal
            className={classes.modal}
            open={props.open}
            onClose={props.toggle}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
        <Fade in={props.open}>
            <div className={classes.paper}>
                <Typography variant='h4' gutterBottom>Update Employee</Typography>
                <FormGroup>
                    <Grid container justify='space-evenly' style={{ width: '80%', margin: 'auto'}}>
                        <TextField 
                            onChange={handleChange} 
                            required 
                            id='firstName' 
                            label='First Name' 
                            defaultValue={state.firstName} 
                            variant='outlined' 
                            size='small' 
                        />
                        <TextField 
                            onChange={handleChange} 
                            id='middleInitial' 
                            label='M.I.' 
                            defaultValue={state.middleInitial} 
                            variant='outlined' 
                            size='small' 
                        />
                        <TextField 
                            onChange={handleChange} 
                            required 
                            id='lastName' 
                            label='Last Name' 
                            defaultValue={state.lastName}
                            variant='outlined' 
                            size='small' 
                        />
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="birthDate"
                                label="Date of Birth"
                                format="MM/DD/YYYY"
                                value={state.birthDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="startDate"
                                label="Date of Employment"
                                format="MM/DD/YYYY"
                                value={state.startDate}
                                onChange={handleChange}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date',
                                }}
                            />
                            <Grid item container direction='row' xs={6}>
                                <Typography>Inactive</Typography>
                                <Switch checked={state.status} onChange={handleToggle} value='isActive' />
                                <Typography>Active</Typography>
                            </Grid>
                            <Button onClick={handleSubmit} variant='contained' color='primary'>Save Employee</Button>
                        </MuiPickersUtilsProvider>
                    </Grid>
                </FormGroup>
            </div>
        </Fade>
    </Modal>
    )
}

export default connect(null, mapDispatchToProps)(UpdateForm)