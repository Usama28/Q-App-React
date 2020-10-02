import logo from "./logo.svg";
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react'
import { Navbar, Nav, Form } from 'react-bootstrap';
import Router from './config/Router';
import firebase from './config/Firebase';
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css';


function App() {

  const [isLoading, SetLoading] = useState(true)
  const [isLoggedIn, SetLogged] = useState(true)

  useEffect(() => {
    stateAuthentication()
  }, [])
  const stateAuthentication = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      SetLogged(user ? { userEmail: user.email } : false)
      SetLoading(false)

    })
  }

  return (
    <div >
      <Provider store={store}>
        <PersistGate persistor={persistor}>

          <div className="head" >
            {isLoggedIn && !isLoading &&
              <div>
                <Navbar expand="lg"
                  style={{ padding: '1% 5% 1% 5%', backgroundColor: '#428792' }}
                >
                  <Navbar.Brand href="/Home"><img width='80' src={logo} className="App-logo" alt="logo" /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" >
                      <Nav.Link href="/Home"><h4 style={{ color: 'black' }}>Home</h4></Nav.Link>
                      <Nav.Link href="/Company"><h4 style={{ color: 'black' }}>Company</h4></Nav.Link>
                      <Nav.Link href=""><h4 style={{ color: 'black' }}>Tokens</h4></Nav.Link>

                    </Nav>
                    <Form inline>
                      <p style={{ margin: ' 1px 34px 0px 0px', color: 'white' }}>Welcome <span style={{ color: 'black', fontWeight: 'bold' }}>{isLoggedIn.userEmail}</span></p>
                      <Button secondary onClick={() => firebase.auth().signOut()} >Sign Out</Button>
                    </Form>
                  </Navbar.Collapse>
                </Navbar>
              </div>}

            <Router isLoggedIn={isLoggedIn} isLoading={isLoading} />
          </div >
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
