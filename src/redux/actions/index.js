import { ADD_EMPLOYEE } from '../constants/action-types'

export function addEmployee(employee) {
    return { type: ADD_EMPLOYEE, employee }
}