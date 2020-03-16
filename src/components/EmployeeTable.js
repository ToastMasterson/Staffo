import React, { Component } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { connect } from 'react-redux'
import { employeeActions } from '../redux/actions/index'
import Spinner from './Spinner'


class EmployeeTable extends Component {
    componentWillMount(){
        this.props.dispatch(employeeActions.fetchEmployees())
    }

    fullName = (employee) => (
        employee.firstName + ' ' + employee.middleInitial + '. ' + employee.lastName
    )

    populateTable = (employees, pending) => {
        return pending
            ? null
            : (
                employees.map(employee => (
                    <TableRow 
                        hover
                        key={employee.id} 
                        onClick={() => this.props.showUpdateForm(employee)}
                    >
                        <TableCell component="th" scope="row">
                            {this.fullName(employee)}
                        </TableCell>
                        <TableCell align="right">
                            {employee.birthDate}
                        </TableCell>
                        <TableCell align="right">
                            {employee.startDate}
                        </TableCell>
                        <TableCell align="right" style={ employee.status ? null : {color: 'red'} }>
                            {employee.status ? 'Active' : 'Inactive'}
                        </TableCell>
                    </TableRow>
                ))
            )
    }

    render() {
        const { error, pending, employees } = this.props

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (pending) {
            return <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}><Spinner /></div>
        }

        return(
            <div className="table">
                <TableContainer component={Paper} style={{ maxHeight: '500px' }}>
                    <Table stickyHeader aria-label="employee table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Employee</TableCell>
                                <TableCell align='right'>Birth Date</TableCell>
                                <TableCell align='right'>Employment Date</TableCell>
                                <TableCell align='right'>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.activeOnly 
                                ? this.populateTable(employees.filter(emp => emp.status === true), pending) 
                                : this.populateTable(employees, pending)
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    employees: state.employees.employees,
    pending: state.employees.pending,
    error: state.employees.error
})


export default connect(mapStateToProps)(EmployeeTable)