import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Grid, Image, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setUser, unsetUser } from '../../store/actions/authAction'
import { setCompany } from '../../store/actions/authCompany'
import MyMapComponent from '../../component/Map'

function Home(props) {

    const history = useHistory()

    const checkRedux = function () {
        props.onLogin({ name: 'usama', age: 21 })
    }

    useEffect(() => {
        props.getCompany()
        // const renderCompany = props.showCompany

    }, [])
    const { showCompany } = props

    return (
        <div>


            <h1>Home</h1>
            <p>Are you a company or waiting for the tokens?</p>
            {/* <h1>{props.user.name}</h1> */}
            <div>
                <Button secondary onClick={() => history.push('/Company')} >Company</Button>
                <Button secondary onClick={checkRedux}>Get Token</Button>
            </div>
            <div >
                <Grid columns={3}  >
                    <Grid.Row style={{ margin: '3% 5%' }} >

                        {showCompany.map((item) => {
                            return <Grid.Column>
                                <Card>
                                    <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
                                    <Card.Content>
                                        <Card.Header>{item.companyName}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Started in {item.date}</span>
                                        </Card.Meta>
                                        <Card.Description style={{ textAlign: 'center' }}>
                                            <Button color='grey'>View Details</Button>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        })}

                    </Grid.Row>
                </Grid>
            </div>
            {/* <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            /> */}


        </div>
    )
}

const mapStateToProps = (state) => {
    console.log('map state from component', state)
    return {
        user: state.AuthReducer.user,
        showCompany: state.companyReducer.Company
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        onLogin: (user) => dispatch(setUser(user)),
        onLogout: () => dispatch(unsetUser()),
        getCompany: () => dispatch(setCompany())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)