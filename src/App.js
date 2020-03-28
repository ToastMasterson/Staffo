import React from 'react'
import { connect } from 'react-redux'
import NavBar from './components/NavBar';
import EmployeeTable from './components/EmployeeTable'
import { Container } from '@material-ui/core';
import Options from './components/Options';
import Form from './components/Form';
import UpdateForm from './components/UpdateForm'

const App = ( { auth }) => {

  const [state, setState] = React.useState({
    showAddForm: false,
    showUpdateForm: false,
    selectedEmployee: {},
    showActiveOnly: false
  })

  const showAddForm = () => {
    state.showAddForm
      ? setState({ showAddForm: false })
      : setState({ showAddForm: true })
  }

  const showUpdateForm = (employee) => {
    state.showUpdateForm
      ? setState({ showUpdateForm: false })
      : setState({ showUpdateForm: true, selectedEmployee: employee })
  }

  const showActiveOnly = () => {
    state.showActiveOnly
      ? setState({ showActiveOnly: false })
      : setState({ showActiveOnly: true })
  }

  return (
    <div className="App">
      <Container maxWidth="md">
        <NavBar />
        {!auth.isEmpty 
          ? <><Options showAddForm={showAddForm} showActiveOnly={showActiveOnly} />
            { state.showAddForm ? <Form /> : null }
            <EmployeeTable showUpdateForm={showUpdateForm} activeOnly={state.showActiveOnly} />
            { state.showUpdateForm 
              ? <UpdateForm 
                employee={state.selectedEmployee} 
                open={state.showUpdateForm} 
                toggle={showUpdateForm} 
              /> 
              : null 
            }</>
            : null
        }
        
      </Container>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth,
    authMsg: state.authReducer.authMsg
  }
}

export default connect(mapStateToProps)(App)
