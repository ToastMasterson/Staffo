import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { employees: state.employees }
}

const fullName = (employee) => {
    return employee.firstName.concat(' ', employee.middleInitial, '. ', employee.lastName)
}

const populateTable = (employees, showUpdateForm, activeOnly) => {
    const dispayedEmployees = activeOnly ? employees.employees.filter(emp => emp.status === true) : employees.employees
    return (
        dispayedEmployees.map(employee => (
            <TableRow 
                hover
                key={employee.id} 
                onClick={() => showUpdateForm(employee)}
            >
                <TableCell component="th" scope="row">
                    {fullName(employee)}
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

const tableData = ({ employees, showUpdateForm, activeOnly }) => {
    return(
    <div className="table">
        <TableContainer component={Paper}>
            <Table aria-label="employee table">
                <TableHead style={{background: 'lightslategrey'}}>
                    <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell align='right'>Birth Date</TableCell>
                        <TableCell align='right'>Employment Date</TableCell>
                        <TableCell align='right'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {populateTable(employees, showUpdateForm, activeOnly)}
                </TableBody>
            </Table>
        </TableContainer>
    </div>)
}

const EmployeeTable = connect(mapStateToProps)(tableData)

export default EmployeeTable