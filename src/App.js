import React from 'react'
import NavBar from './components/NavBar';
import EmployeeTable from './components/EmployeeTable'
import { Container } from '@material-ui/core';
import Options from './components/Options';
import Form from './components/Form';

function App() {

  const [state, setState] = React.useState({
    showAddForm: false
  })

  const showAddForm = () => {
    state.showAddForm
      ? setState({ showAddForm: false })
      : setState({ showAddForm: true })
  }

  return (
    <div className="App">
      <Container maxWidth="md">
        <NavBar />
        <Options showAddForm={showAddForm} />
        { state.showAddForm ? <Form /> : null }
        <EmployeeTable />
      </Container>
    </div>
  );
}

export default App;
