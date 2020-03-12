import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../constants/action-types'

export function addEmployee(employee) {
    return { type: ADD_EMPLOYEE, employee }
}

export function updateEmployee(employee) {
    return { type: UPDATE_EMPLOYEE, employee }
}