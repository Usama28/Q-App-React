import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './config/Router';
import { firebase } from './config/Firebase'

function App() {

  const [isLoggedIn, SetLogged] = useState(true)
  const [isLoading, SetLoading] = useState(true)

  useEffect(() => {
    stateAuthentication()
  }, [])
  const stateAuthentication = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      SetLogged(user ? { userEmail: user.email } : false)
      SetLoading(false)
      console.log(user)
    })
  }

  return (
    <div >
      <div className="head" >
        <Router isLoggedIn={isLoggedIn} isLoading={isLoading} />
      </div>

    </div>
  );
}

export default App;
