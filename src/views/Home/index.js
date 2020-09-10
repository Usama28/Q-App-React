import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setUser } from '../../store/actions'

function Home(props) {

    console.log(props)
    const history = useHistory()

    const checkRedux = function () {

        props.onLogin({ name: 'usama', age: 21 })
    }
    return (
        <div>


            <h1>Home</h1>
            <p>Are you a company or waiting for the tokens?</p>

            <div>
                <Button secondary onClick={() => history.push('/Company')} >Company</Button>
                <Button secondary onClick={checkRedux}>Normal User</Button>



            </div>


        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('state from component', state)
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (user) => dispatch(setUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)