import React from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom";


import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import Rejoindre from "./core/Rejoindre"
import Winner from "./core/Winner"
import Play from "./core/Play"
import Navbar from "./core/Navbar"
import Dashboard from "./admin/Dashboard"
import AddQuestion from "./admin/AddQuestion"



import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"


// Import All Component Page

function Routes() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Switch>
              <AdminRoute path='/admin/dashboard/participant' exact component={AddQuestion} />
              <AdminRoute path='/admin/dashboard' exact component={Dashboard} />
              <PrivateRoute path='/' exact component={Home} />
              <PrivateRoute path='/winner' exact component={Winner} />
              <PrivateRoute path='/rejoindre' exact component={Rejoindre} />
              <PrivateRoute path="/game" exact component={Play} />
              <Route path="/signin" exact component={Signin}/>
              <Route path="/signup" exact component={Signup}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
