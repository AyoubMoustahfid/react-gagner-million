import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Navbar from "./core/Navbar"



// Import All Component Page

function Routes() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
              <Route path="/signin"  component={Signin}/>
              <Route path="/signup"  component={Signup}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
