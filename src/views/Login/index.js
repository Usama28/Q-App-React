import React, { useState } from 'react'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import { LogIn, FbSignIn } from '../../config/Firebase'

function Login() {

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
                                <p >Didn't Have an account? <a href="">Sign Up</a></p>
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
        </div>
    )
}

export default Login