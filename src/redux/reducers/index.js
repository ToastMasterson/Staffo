import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../constants/action-types'

const initialState = {
    employees: [
        {
            id: 0, 
            firstName: 'John', 
            middleInitial: 'A', 
            lastName: 'Smith', 
            birthDate: 'Fri Mar 25 1985', 
            startDate: 'Tue Apr 10 2010', 
            status: true
        }, {
            id: 1, 
            firstName: 'Timothy', 
            middleInitial: 'C', 
            lastName: 'Greene', 
            birthDate: 'Thur Jan 13 1975', 
            startDate: 'Tue May 4 2005', 
            status: false
        }, {
            id: 2, 
            firstName: 'Carl', 
            middleInitial: 'M', 
            lastName: 'Edmond', 
            birthDate: 'Mon May 11 1995', 
            startDate: 'Mon Nov 7 2007', 
            status: true
        }, {
            id: 3, 
            firstName: 'Chris', 
            middleInitial: 'L', 
            lastName: 'Traeger', 
            birthDate: 'Fri Feb 28 1977', 
            startDate: 'Wed July 22 2009', 
            status: true
        }
    ]
}

function rootReducer(state = initialState, action) {
    switch(action.type){
        case ADD_EMPLOYEE:
            let id = state.employees.length
            const newEmployee = {id, ...action.employee}
            return Object.assign({}, state, {
                employees: state.employees.concat(newEmployee)
            })
        case UPDATE_EMPLOYEE:
            return Object.assign({}, state, {
                employees: state.employees.map(employee => employee.id === action.employee.id ? {...action.employee}:employee)
            })
        default:
            return state
    }
}

export default rootReducer