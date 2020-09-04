import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Login from "../../views/Login";
import Home from "../../views/Home";

function router(props) {

    const { isLoggedIn } = props

    console.log(isLoggedIn)
    const currentPath = window.location.pathname.length === 1 ? 'Home' : window.location.pathname

    console.log(currentPath)
    return (
        <div>
            <Router>

                <Switch>
                    <Route path="/" exact>
                        {isLoggedIn ? < Redirect to={currentPath} /> : <Login />}
                    </Route>

                    <Route path="/Home">
                        {AuthChecker(isLoggedIn, <Home />)}
                    </Route>

                </Switch>
            </Router>
        </div >
    )
}
function AuthChecker(loggedValue, component) {
    return loggedValue ? component : <Redirect path='/' />
}
export default router;