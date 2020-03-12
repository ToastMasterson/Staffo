import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index'
import { forbiddenCharactersMiddleware } from '../middleware'

const store = createStore(
    rootReducer,
    applyMiddleware(forbiddenCharactersMiddleware)
)

export default store