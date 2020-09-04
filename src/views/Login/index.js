import React, { useState } from 'react'
import { Form, Grid, Segment, Button, Icon, Modal } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { LogIn, FbSignIn } from '../../config/Firebase'

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


function Login() {
    //code for modal
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state

    //original code
    const history = useHistory()
    const [LoginEmail, SetLoginEmail] = useState('')
    const [LoginPassword, SetLoginPassword] = useState('')
    const [provider, setProvider] = useState('')

    //login function
    const setLogin = async function () {
        try {
            await LogIn(LoginEmail, LoginPassword)
            history.replace('/Home')
        }
        catch (error) {
            alert(error.message)
        }
    }

    //facebook login
    const FbUser = async function () {
        try {
            const result = await FbSignIn(provider)
            var token = result.credential.accessToken;
            var user = result.user;
            history.push('/Home')
            console.log(token)
            console.log(user)
        }
        catch (error) {
            alert(error.message)
        }
    }



    return (
        <div className="App-header">
            <Grid style={{ width: 382, verticalAlign: 'left' }}>
                <Grid.Column style={{ backgroundColor: 'white', border: '1px solid transparent', borderRadius: '2%', padding: '4%' }}>
                    <h1 style={{ color: 'black', textAlign: "center" }}>Login</h1>
                    <hr />
                    <Form>
                        <Segment style={{ padding: '4%' }}>

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

                            <Button.Group widths='2'>
                                <Button
                                    secondary
                                    onClick={setLogin}
                                >Login</Button>
                            </Button.Group>
                            <div style={{
                                textAlign: 'center',
                                fontSize: ' 15px',
                                color: 'black',
                                marginTop: '2%'
                            }}>
                                <p >Didn't Have an account? <button
                                    onClick={() => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })}
                                >Sign Up</button></p>
                            </div>

                            <Button.Group widths='2' style={{ marginTop: '3%' }}>
                                <Button
                                    color='facebook'
                                    onClick={FbUser} >
                                    <Icon name='facebook' /> Facebook
                                </Button>
                                <Button color='red' style={{ marginLeft: '1%' }}>
                                    <Icon name='google' /> Google
                                </Button>
                            </Button.Group>

                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>

            {/* signup Modal */}

            <Modal
                dimmer={dimmer}
                open={open}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
            >
                <Modal.Header>SIGN UP</Modal.Header>
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

                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            label='Password'
                                            placeholder='Enter Password'

                                        />
                                    </Form.Group>
                                    <Form.Group widths='equal'>
                                        <Form.Input
                                            fluid
                                            label='Confirm Password'
                                            placeholder='Confirm Password'
                                        />
                                    </Form.Group>
                                    <Form.Checkbox label='I agree to the Terms and Conditions' />


                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>

                </Modal.Content>
                <Modal.Actions>
                    <Button secondary onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                        SIGN UP
                        </Button>
                </Modal.Actions>
            </Modal>

        </div>
    )
}

export default Login