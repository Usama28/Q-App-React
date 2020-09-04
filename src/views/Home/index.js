import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'

function Home() {
    return (
        <div>
            <div>
                <div >
                    <h1>Home</h1>
                    <p>Are you a company or waiting for the tokens?</p>

                    <div>
                        <Button secondary >Company</Button>
                        <Button secondary >Normal User</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home;