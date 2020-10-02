import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Grid, Image, Button, Modal, Segment, Form, Search } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setUser, unsetUser } from '../../store/actions/authAction'
import { setCompany } from '../../store/actions/authCompany'
import firebase from '../../config/Firebase'
import MyMapComponent from '../../component/Map'
import companyDetails from '../companyDetails'

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

function Home(props) {
    //code for modal
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state

    const history = useHistory()
    const checkRedux = function () {
        props.onLogin({ name: 'usama', age: 21 })
    }

    useEffect(() => {
        props.getCompany()

    }, [])

    const { showCompany } = props
    const [time, setTime] = useState('')
    const [token, setToken] = useState('')

    // const isBottom=(el)=> {
    //     return el.getBoundingClientRect().bottom <= window.innerHeight+10;
    //   }

    //   componentDidMount() {
    //     document.addEventListener('scroll', this.trackScrolling);
    //   }

    //   componentWillUnmount() {
    //     document.removeEventListener('scroll', this.trackScrolling);
    //   }

    //  const trackScrolling = () => {
    //     const wrappedElement = document.getElementById('header');
    //     if (isBottom(wrappedElement)) {
    //       console.log('header bottom reached');
    //       document.removeEventListener('scroll', trackScrolling);
    //     }
    //   };



    // const [userID, setUserID] = useState(firebase.auth().currentUser)
    const IDsObj = JSON.parse(localStorage.getItem('userIds'))

    const [index, setIndex] = useState('')
    const tokenIndex = function (index) {
        setIndex(IDsObj[index])
        console.log('tkoen index', IDsObj[index])
        dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })
    }

    const tokenDetails = function () {
        var washingtonRef = firebase.firestore().collection("Company Details").doc(index)
        return washingtonRef.update({
            time,
            token
        })
            .then(function () {
                console.log("Document successfully updated!");
                dispatch({ type: 'CLOSE_MODAL' })
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                alert("Error updating document: ", error.message);
            });
    }

    const specificDetail = function (getData, index) {

        localStorage.setItem('detailsIndex', index)
        history.push('/CompanyDetails/' + IDsObj[index])
        localStorage.setItem('setTokenID', IDsObj[index])
        localStorage.setItem('companyData', JSON.stringify(getData))
    }
    return (
        <div>
            <h1>Home</h1>
            <p>Are you a company or waiting for the tokens?</p>
            {/* <h1>{props.user.name}</h1> */}
            <div>
                <Button secondary onClick={() => history.push('/Company')} >Company</Button>
                <Button secondary onClick={checkRedux}>Get Token</Button>
                <input placeholder='search company'
                    id='search-value'
                />
            </div>
            <div id='company-id'>
                <Grid columns={3}  >
                    <Grid.Row style={{ margin: '3% 5%' }} >
                        {showCompany.map((item, index) => {
                            return <Grid.Column >
                                <Card id='show-card' style={{ marginTop: '8%' }}>

                                    <Image src={item.image} />
                                    <Card.Content>
                                        <Card.Header id='name-id'>{item.companyName}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Started in {item.date}</span>
                                        </Card.Meta>
                                        <Button
                                            onClick={() => specificDetail(item, index)}
                                        >View Details
                                        </Button>
                                        <Button
                                            secondary
                                            onClick={() => { tokenIndex(index) }}
                                        >Add Token
                                        </Button>
                                        <Card.Description style={{ textAlign: 'center' }}>
                                            <div className="company-modal" >
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItem: 'center',
                                                    textAlign: 'center'
                                                }} >
                                                    <Modal
                                                        style={
                                                            {
                                                                width: 380,
                                                                height: 350
                                                            }}
                                                        dimmer={dimmer}
                                                        open={open}
                                                        onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                                                    >
                                                        {/* add tokens */}
                                                        <Modal.Header>Add Details</Modal.Header>
                                                        <Modal.Content>
                                                            <Grid >
                                                                <Grid.Column>
                                                                    <Form>
                                                                        <Segment style={{ padding: '4%' }}>
                                                                            <Form.Group widths='equal'>
                                                                                <Form.Input
                                                                                    fluid
                                                                                    label='Token'
                                                                                    placeholder='Enter name of company'
                                                                                    onChange={(e) => { setToken(e.target.value) }}
                                                                                />
                                                                            </Form.Group>

                                                                            <Form.Group widths='equal'>
                                                                                <Form.Input
                                                                                    fluid
                                                                                    label='Time'
                                                                                    // type='date'
                                                                                    placeholder='Enter time for each token'
                                                                                    onChange={(e) => { setTime(e.target.value) }}
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
                                                                onClick={tokenDetails}
                                                            >
                                                                Add
                                                             </Button>
                                                        </Modal.Actions>
                                                    </Modal>
                                                </div>
                                            </div>
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