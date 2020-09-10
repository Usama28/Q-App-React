import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import { User } from '../../config/Firebase'

function SignUp(props) {

    console.log(props)
    const history = useHistory()
    const [userEmail, SetUserEmail] = useState('')
    const [userPassword, SetUserPassword] = useState('')

    //sign up funciton
    const registerUser = async function () {
        try {
            await User(userEmail, userPassword)
            history.push('/')
        }
        catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>

            <div className="App-header">
                <Grid style={{ width: 382, verticalAlign: 'left' }}>
                    <Grid.Column style={{ backgroundColor: 'white', border: '1px solid transparent', borderRadius: '2%', padding: '4%' }}>
                        <h1 style={{ color: 'black', textAlign: "center" }}>Sign Up</h1>
                        <hr />
                        <Form>
                            <Segment style={{ padding: '4%' }}>

                                <Form.Group widths='equal'>
                                    <Form.Input label='First Name' placeholder='Enter first name' />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input label='Last Name' placeholder='Enter last name' />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Email'
                                        placeholder='Enter Email'
                                        onChange={(e) => SetUserEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Password'
                                        placeholder='Enter Password'
                                        onChange={(e) => SetUserPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        fluid
                                        label='Confirm Password'
                                        placeholder='Enter Password again'
                                    />
                                </Form.Group>

                                <Button.Group widths='2'>
                                    <Button
                                        secondary
                                        onClick={registerUser}
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