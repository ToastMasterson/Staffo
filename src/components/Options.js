import React from 'react'
import { Paper, Button, FormControlLabel, Switch, Grid } from '@material-ui/core'

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
            <Paper style={{margin: '10px', padding: '10px'}}>
                <Grid container>
                    <FormControlLabel 
                        control={
                            <Switch checked={state.showActiveOnly} onChange={handleToggle} value='showActiveOnly' />
                        }
                        label='Show Active Only'
                    >
                    </FormControlLabel>
                    <Button variant='contained' onClick={handleClick} size='small'>
                        Add Employee
                    </Button>
                </Grid>
            </Paper>
        </div>
    )
}

export default Options