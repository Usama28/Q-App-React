import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input, Menu, Button } from 'semantic-ui-react'
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import Router from './config/Router';
import { firebase } from './config/Firebase';
import { Provider } from 'react-redux'
import { store, persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'

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
                <Navbar bg="light" variant="light">
                  <Navbar.Brand href="#home">Q APP </Navbar.Brand>
                  <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                  </Nav>
                  <Form inline>
                    <p>Welcome <span style={{ color: 'black', fontWeight: 'bold' }}>{isLoggedIn.userEmail}</span></p>
                    <Button secondary onClick={() => firebase.auth().signOut()} >Sign Out</Button>
                  </Form>
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
