import React from 'react'
import { Paper, Button, FormGroup, FormControlLabel, Switch } from '@material-ui/core'

const Options = ({ showAddForm, showActiveOnly }) => {

    const [state, setState] = React.useState({
        showActiveOnly: false
    })

    const handleToggle = () => {
        state.showActiveOnly
            ? setState({ showActiveOnly: false })
            : setState({ showActiveOnly: true})
        showActiveOnly()
    }

    const handleClick = () => {
        showAddForm()
    }

    return (
        <div className='options'>
            <Paper>
                <FormGroup row>
                    <FormControlLabel 
                        control={
                            <Switch checked={state.showActiveOnly} onChange={handleToggle} value='showActiveOnly' />
                        }
                        label='Show Active Only'
                    >
                    </FormControlLabel>
                    <Button variant='contained' onClick={handleClick}>
                        Add Employee
                    </Button>
                </FormGroup>
            </Paper>
        </div>
    )
}

export default Options