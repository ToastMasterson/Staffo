import store from '../redux/store/store'
import { addEmployee, updateEmployee } from '../redux/actions/index'

window.store = store
window.addEmployee = addEmployee
window.updateEmployee = updateEmployee