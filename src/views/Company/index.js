import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Modal } from 'semantic-ui-react'
import { firebase, storage } from '../../config/Firebase'

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

    //states 
    const [companyName, setCompName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [address, setAddress] = useState('')
    const [imageFile, setImgFile] = useState('')

    //add details to firebase
    const addDetails = function () {
        firebase.firestore().collection('Company Details').add(
            {
                companyName,
                date,
                time,
                address
            }
        ).then(function () {
            setCompName('')
            setDate('')
            setTime('')
            setAddress('')
            dispatch({ type: 'CLOSE_MODAL' })
        })
        //upload image to firebase
        const uploadTask = storage.ref(`/images/${imageFile.name}`).put(imageFile)
        //initiates the firebase side uploading 
        uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            })
    }


    return (
        <div>
            <h1>Company</h1>
            <Button
                secondary
                onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
            >+</Button>

            {/* Modal Code */}
            <div className="company-modal">
                <Modal
                    style={{ width: 380 }}
                    dimmer={dimmer}
                    open={open}
                    onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                >
                    <Modal.Header>Add Details</Modal.Header>
                    <Modal.Content>
                        <Grid >
                            <Grid.Column>
                                <Form>
                                    <Segment style={{ padding: '4%' }}>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                label='Company Name'
                                                placeholder='Enter name of company'
                                                id='company-id'
                                                onChange={(e) => { setCompName(e.target.value) }}
                                            />
                                        </Form.Group>

                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                label='Since'
                                                type='date'
                                                id='date-id'
                                                onChange={(e) => { setDate(e.target.value) }}
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                label='Certificates'
                                                type='file'
                                                id='img-1'
                                                onChange={(e) => { setImgFile(e.target.files[0]) }}
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                type='file'
                                                id='img-2'
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                type='file'
                                                id='img-3'
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                type='time'
                                                label='Timings'
                                                id='time-id'
                                                onChange={(e) => { setTime(e.target.value) }}
                                            />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input
                                                fluid
                                                type='text'
                                                label='Address'
                                                id='address-id'
                                                onChange={(e) => { setAddress(e.target.value) }}
                                            />
                                        </Form.Group>

                                    </Segment>
                                </Form>
                            </Grid.Column>
                        </Grid>

                    </Modal.Content>
                    <Modal.Actions style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            secondary
                            onClick={addDetails}>
                            Add
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </div>



    )
}

export default Company;