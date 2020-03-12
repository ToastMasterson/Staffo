import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core'
import { connect } from 'react-redux'

const mapStateToProps = state => {
    return { employees: state.employees}
}

const fullName = (employee) => {
    return employee.firstName.concat(' ', employee.middleInitial, ' ', employee.lastName)
}

const tableData = ({ employees }) => (
    <div className="table">
        <TableContainer component={Paper}>
            <Table aria-label="employee table">
                <TableHead>
                    <TableRow>
                        <TableCell>Employee</TableCell>
                        <TableCell align='right'>Birth Date</TableCell>
                        <TableCell align='right'>Employment Date</TableCell>
                        <TableCell align='right'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map(employee => (
                        <TableRow key={employee.id}>
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
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)

const EmployeeTable = connect(mapStateToProps)(tableData)

export default EmployeeTable