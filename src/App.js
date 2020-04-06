import React from 'react'
import { connect } from 'react-redux'
import NavBar from './components/NavBar';
import EmployeeTable from './components/EmployeeTable'
import { Container, Snackbar } from '@material-ui/core';
import Options from './components/Options';
import Form from './components/Form';
import UpdateForm from './components/UpdateForm'
import Welcome from './components/Welcome';
import Alert from '@material-ui/lab/Alert';

const App = ( { auth, authMsg }) => {

  const [state, setState] = React.useState({
    showAddForm: false,
    showUpdateForm: false,
    selectedEmployee: {},
    showActiveOnly: false,
    sbOpen: false,
  })

  React.useEffect(() => {
    if (authMsg !== "") {
    setState({...state, sbOpen: true })
    }
  }, [authMsg])

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

  const handleSBClose = (event, reason) => {
    if (reason === 'clickaway') {
        return
    }
    setState({ ...state, sbOpen: false })
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
            : <Welcome />
        }
          <Snackbar 
            open={state.sbOpen}
            autoHideDuration={3000} 
            onClose={handleSBClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <Alert severity="error">
                {authMsg}
            </Alert>
          </Snackbar>
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
