import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { employees: state.employees }
}

const fullName = (employee) => {
    return employee.firstName.concat(' ', employee.middleInitial, '. ', employee.lastName)
}

const populateTable = (employees, showUpdateForm) => (
    employees.employees.map(employee => (
        <TableRow style={employee.status ? {background: 'beige'} : {background: 'gray'}} key={employee.id} onClick={() => showUpdateForm(employee)}>
            <TableCell component="th" scope="row">
            {fullName(employee)}
            </TableCell>
            <TableCell align="right">
                {employee.birthDate}
            </TableCell>
            <TableCell align="right">
                {employee.startDate}
            </TableCell>
            <TableCell align="right">
                {employee.status ? 'Active' : 'Inactive'}
            </TableCell>
        </TableRow>
    ))
)

const tableData = ({ employees, showUpdateForm, activeOnly }) => (
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
                    {activeOnly ? populateTable(employees.filter(emp => emp.status === true), showUpdateForm) : populateTable(employees, showUpdateForm)}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)

const EmployeeTable = connect(mapStateToProps)(tableData)

export default EmployeeTable