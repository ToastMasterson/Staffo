import React from 'react'
import NavBar from './components/NavBar';
import EmployeeTable from './components/EmployeeTable'
import { Container } from '@material-ui/core';
import Options from './components/Options';
import Form from './components/Form';
import UpdateForm from './components/UpdateForm'

function App() {

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
        <Options showAddForm={showAddForm} showActiveOnly={showActiveOnly} />
        { state.showAddForm ? <Form /> : null }
        <EmployeeTable showUpdateForm={showUpdateForm} activeOnly={state.showActiveOnly} />
        { state.showUpdateForm 
          ? <UpdateForm 
            employee={state.selectedEmployee} 
            open={state.showUpdateForm} 
            toggle={showUpdateForm} 
          /> 
          : null 
        }
      </Container>
    </div>
  );
}

export default App;
