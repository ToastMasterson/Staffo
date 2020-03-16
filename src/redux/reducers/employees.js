import { FETCH_EMPLOYEES_ERROR, FETCH_EMPLOYEES_SUCCESS, FETCH_EMPLOYEES_PENDING, ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../constants/action-types'

const initialState = {
    pending: true,
    employees: [],
    error: null
}

export default function employees(state = initialState, action) {
    switch(action.type){
        case FETCH_EMPLOYEES_PENDING:
            return { ...state, pending: true }
        case FETCH_EMPLOYEES_SUCCESS:
            return Object.assign({}, state, {
                employees: action.payload.employees,
                pending: false,
                error: null
            })
        case FETCH_EMPLOYEES_ERROR:
            return { ...state, pending: false, error: action.error }
        case ADD_EMPLOYEE:
            const newEmployee = {...action.employee}
            return Object.assign({}, state, {
                employees: state.employees.concat(newEmployee)
            })
        case UPDATE_EMPLOYEE:
            debugger
            return Object.assign({}, state, {
                employees: state.employees.map(employee => employee.id === action.employee.id ? {...action.employee}:employee)
            })
        default:
            return state
    }
}