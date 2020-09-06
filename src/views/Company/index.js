import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Modal } from 'semantic-ui-react'

//function for modal no logics
function exampleReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: action.dimmer }
        case 'CLOSE_MODAL':
            return { open: false }
        default:
            throw new Error()
    }
}

function Company() {

    //code for modal
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state
    return (
        <div>
            <h1>Company</h1>
            <Button
                secondary
                onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
            >+</Button>

            {/* Modal Code */}
            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
                <Modal.Header>Add Details</Modal.Header>
                <Modal.Content>
                    <Grid>
                        <Grid.Column>
                            <Form>
                                <Segment style={{ padding: '4%' }}>
                                    <Form.Group widths='equal'>
                                        <Form.Input fluid label='First name' placeholder='First name' />
                                        <Form.Input fluid label='Last name' placeholder='Last name' />

                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            label='Email'
                                            placeholder='Enter Email'

                                        />
                                    </Form.Group>


                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>

                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        Add
                        </Button>
                </Modal.Actions>
            </Modal>
        </div>



    )
}

export default Company;