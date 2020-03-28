import * as helpers from '../helpers'
import { ADD_EMPLOYEE, UPDATE_EMPLOYEE, FETCH_EMPLOYEES_ERROR, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_PENDING } from '../constants/action-types'

export const fetchEmployeesPending = () => ({ type: FETCH_EMPLOYEES_PENDING })
export const fetchEmployeesSuccess = employees => ({ type: FETCH_EMPLOYEES_SUCCESS, payload: { employees } })
export const fetchEmployeesError = error => ({ type: FETCH_EMPLOYEES_ERROR, payload: { error } })

const addEmployee = (employee, dispatch) => {
    fetch(`${helpers.apiUrl}/api/employees`, helpers.postOptions(employee))
        .then(helpers.handleResponse)
        .then(employee => dispatch({type: ADD_EMPLOYEE, employee}))
}

const updateEmployee = (employee, dispatch) => {
    fetch(`${helpers.apiUrl}/api/employees/${employee.id}`, helpers.updateOptions(employee))
        .then(helpers.handleResponse)
        .then(employee => dispatch({type: UPDATE_EMPLOYEE, employee}))
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