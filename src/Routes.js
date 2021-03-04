import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";


import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import GroupMember from "./core/GroupMember"
import Navbar from "./core/Navbar"


import PrivateRoute from "./auth/PrivateRoute"


// Import All Component Page

function Routes() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
              <PrivateRoute path='/' exact component={Home} />
              <PrivateRoute path="/group_member" exact component={GroupMember} />
              <Route path="/signin" exact component={Signin}/>
              <Route path="/signup" exact component={Signup}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
