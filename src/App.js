import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './config/Router';
import { firebase } from './config/Firebase';
import { Button } from 'semantic-ui-react'
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
                <h5>{isLoggedIn.userEmail}</h5>
                <Button secondary onClick={() => firebase.auth().signOut()} >Sign Out</Button>
              </div>}
            <Router isLoggedIn={isLoggedIn} isLoading={isLoading} />
          </div >
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
