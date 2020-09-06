import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'

function Home() {

    const history = useHistory()
    return (
        <div>


            <h1>Home</h1>
            <p>Are you a company or waiting for the tokens?</p>
            <h1>Home welcome </h1>
            <div>
                <Button secondary onClick={() => history.push('/Company')} >Company</Button>
                <Button secondary >Normal User</Button>
                <Button secondary >Normal User</Button>
                <Button secondary >Normal User</Button>
                <Button secondary >Normal User</Button>
                <Button secondary >Normal User</Button>


            </div>

               =
        </div>
    )
}

export default Home;