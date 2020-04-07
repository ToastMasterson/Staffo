import * as helpers from '../helpers'
import { ADD_EMPLOYEE, ADD_EMPLOYEE_ERROR, UPDATE_EMPLOYEE, UPDATE_EMPLOYEE_ERROR, FETCH_EMPLOYEES_ERROR, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_PENDING } from '../constants/action-types'

export const fetchEmployeesPending = () => ({ type: FETCH_EMPLOYEES_PENDING })
export const fetchEmployeesSuccess = employees => ({ type: FETCH_EMPLOYEES_SUCCESS, payload: { employees } })
export const fetchEmployeesError = error => ({ type: FETCH_EMPLOYEES_ERROR, payload: { error } })
export const addEmployeeError = error => ({ type: ADD_EMPLOYEE_ERROR, payload: {error} })
export const updateEmployeeError = error => ({ type: UPDATE_EMPLOYEE_ERROR, payload: {error} })

const addEmployee = (employee, dispatch) => {
    fetch(`${helpers.apiUrl}/api/employees`, helpers.postOptions(employee))
        .then(handleErrors)
        .then(helpers.handleResponse)
        .then(employee => dispatch({type: ADD_EMPLOYEE, employee}))
        .catch(error => dispatch(addEmployeeError(error)))
}

const updateEmployee = (employee, dispatch) => {
    fetch(`${helpers.apiUrl}/api/employees/${employee.id}`, helpers.updateOptions(employee))
        .then(handleErrors)
        .then(helpers.handleResponse)
        .then(employee => dispatch({type: UPDATE_EMPLOYEE, employee}))
        .catch(error => dispatch(updateEmployeeError(error)))
}

const fetchEmployees = () => {
    return dispatch => {
        dispatch(fetchEmployeesPending())
        return fetch(`${helpers.apiUrl}/api/employees`)
            .then(handleErrors)
            .then(res => res.json())
            .then(employees  => {
                dispatch(fetchEmployeesSuccess(employees))
                return employees
            })
            .catch(error => dispatch(fetchEmployeesError(error)))
    }
}

const handleErrors = response => {
    if  (!response.ok) {
        throw Error(response.statusText)
    }
    return response
}

export const employeeActions = {
    addEmployee,
    updateEmployee,
    fetchEmployees
}