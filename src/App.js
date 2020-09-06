import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './config/Router';
import { firebase } from './config/Firebase';
import { Button } from 'semantic-ui-react'


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

  const [switchState, setState] = useState(false)


  return (
    <div >
      <div className="head" >
        {isLoggedIn && !isLoading && <div>
          <h5>{isLoggedIn.userEmail}</h5>
          <Button secondary onClick={() => firebase.auth().signOut()} >Sign Out</Button>
        </div>}

        <Router isLoggedIn={isLoggedIn} isLoading={isLoading} />
      </div >

      {/* <div switchState={switchState}>
        <h1 >bulb on</h1>
        <h1>bulb off</h1>
      </div> */}
    </div>
  );
}

export default App;
