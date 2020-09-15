import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input, Menu, Button } from 'semantic-ui-react'
import { Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
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
                <Navbar bg="light" expand="lg"
                  style={{ padding: '1% 5% 1% 5%' }}
                >
                  <Navbar.Brand href="/Home"><img width='100' height='50' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIcNlxmWxNVsnOVs0JLl9ALQQlzxgJ1Wbe_w&usqp=CAU' /></Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" >
                      <Nav.Link href="/Home"><h4>Home</h4></Nav.Link>
                      <Nav.Link href="/Company"><h4>Company</h4></Nav.Link>
                      <Nav.Link href=""><h4>Tokens</h4></Nav.Link>

                    </Nav>
                    <Form inline>
                      <p style={{ margin: ' 1px 34px 0px 0px' }}>Welcome <span style={{ color: 'black', fontWeight: 'bold' }}>{isLoggedIn.userEmail}</span></p>
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
