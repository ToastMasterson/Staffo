import { ADD_EMPLOYEE, UPDATE_EMPLOYEE } from '../constants/action-types'

const forbiddenCharacters = ['~`!#$%^&*+=-[]\\\';,/{}|\":<>?']

export function forbiddenCharactersMiddleware({ dispatch }) {
    return function(next) {
        return function(action) {

            switch(action.type) {
                case ADD_EMPLOYEE || UPDATE_EMPLOYEE:
                    const foundCharacter = forbiddenCharacters.filter(char => 
                        action.employee.firstName.includes(char)
                    )

                    if (foundCharacter.length) {
                        return dispatch({ type: 'FOUND_BAD_CHARACTER' })
                    }
            }
            
            return next(action)
        }
    }
}