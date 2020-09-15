import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from "../../views/Login";
import Home from "../../views/Home";
import Company from "../../views/Company";
import SignUp from "../../views/SignUp";

function router(props) {

    const { isLoggedIn, isLoading } = props
    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '10%' }}>
            <img width='300' src="https://i.gifer.com/7SMT.gif" />
        </div>
    }
    const currentPath = window.location.pathname.length === 1 ? 'Home' : window.location.pathname
    console.log(currentPath)
    return (
        <div>
            <Router>

                <Switch>
                    <Route path="/" exact>
                        {isLoggedIn ? < Redirect to={currentPath} /> : <Login />}
                    </Route>
                    <Route path="/SignUp">
                        {StateChecker(isLoggedIn, <SignUp />)}
                    </Route>
                    <Route path="/Home">
                        {AuthChecker(isLoggedIn, <Home />)}
                    </Route>
                    <Route path="/Company">
                        {AuthChecker(isLoggedIn, <Company />)}
                    </Route>

                </Switch>
            </Router>
        </div >
    )
}
function AuthChecker(loggedValue, component) {
    return loggedValue ? component : <Redirect to='/' />
}
function StateChecker(stateValue, component) {
    return !stateValue ? component : <Login />
}
export default router;