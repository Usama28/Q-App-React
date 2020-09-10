import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'

function SignUp(props) {

    console.log(props)
    const history = useHistory()
    const [LoginEmail, SetLoginEmail] = useState('')
    const [LoginPassword, SetLoginPassword] = useState('')

    return (
        <div>

            <div>
                <Grid style={{ width: 382, verticalAlign: 'left' }}>
                    <Grid.Column style={{ backgroundColor: 'white', border: '1px solid transparent', borderRadius: '2%', padding: '4%' }}>
                        <h1 style={{ color: 'black', textAlign: "center" }}>Login</h1>
                        <hr />
                        <Form>
                            <Segment style={{ padding: '4%' }}>

                                <Form.Group widths='equal'>
                                    <Form.Input label='First Name' placeholder='Enter first name' />
                                    <Form.Input label='Last Name' placeholder='Enter last name' />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Email'
                                        placeholder='Enter Email'
                                        onChange={(e) => SetLoginEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Password'
                                        placeholder='Enter Password'
                                        onChange={(e) => SetLoginPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Confirm Password'
                                        placeholder='Enter Password again'
                                        onChange={(e) => SetLoginPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button.Group widths='2'>
                                    <Button
                                        secondary
                                    >Sign Up</Button>
                                </Button.Group>
                                <div style={{
                                    textAlign: 'center',
                                    fontSize: ' 15px',
                                    color: 'black',
                                    marginTop: '2%'
                                }}>
                                    <p >Already Have an acoount? <button
                                        style={{ border: 'none', backgroundColor: 'white', color: 'blue' }}
                                        onClick={() => { history.push('/') }}
                                    >Login</button></p>
                                </div>


                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>


        </div>
    )
}
export default SignUp