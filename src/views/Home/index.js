import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Grid, Segment, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setUser, unsetUser } from '../../store/actions/authAction'
import MyMapComponent from '../../component/Map'
function Home(props) {

    const history = useHistory()

    const checkRedux = function () {

        props.onLogin({ name: 'usama', age: 21 })

    }
    return (
        <div>


            <h1>Home</h1>
            <p>Are you a company or waiting for the tokens?</p>
            <h1>{props.user.name}</h1>
            <div>
                <Button secondary onClick={() => history.push('/Company')} >Company</Button>
                <Button secondary onClick={checkRedux}>Normal User</Button>
            </div>
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />


        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('map state from component', state)
    return {
        user: state.AuthReducer.user
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        onLogin: (user) => dispatch(setUser(user)),
        onLogout: () => dispatch(unsetUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)