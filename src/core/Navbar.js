import React, {Fragment} from 'react'
import {Link, useHistory } from "react-router-dom"
import { isAuthenticated } from "./../auth/helpers"
import {API_URL} from './../config'

import toastr from 'toastr';
import "toastr/build/toastr.css";


const Navbar = () => {
  let history = useHistory();

const signout = () => {

fetch(`${API_URL}/signout`)
.then(() => {

toastr.info('User SignOut', 'Next Time', {
positionClass: "toast-bottom-left",
})

localStorage.removeItem('jwt_info')

history.push('/signin')

})


}
return (
<div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to={`${isAuthenticated() ? '/' : '/signin' }`}>Navbar </Link> 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {!isAuthenticated() && (

          <Fragment>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/signin">Signin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/signup">Signup</Link>
            </li>
          </Fragment>
          )}
          

    

          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" aria-current="page" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dashboard </Link> 
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Fragment>
              <li>
                <Link className="dropdown-item" to={`${isAuthenticated() && isAuthenticated().participant.role===1 ?'/admin' : '' }/dashboard/participant`} >Participant</Link>
              </li>

              <li>
                <Link className="dropdown-item" to={`${isAuthenticated() && isAuthenticated().participant.role===1 ?'/admin' : '' }/dashboard`} >Question</Link>
              </li>

              <li>
                <Link className="dropdown-item" to={`${isAuthenticated() && isAuthenticated().participant.role===1 ?'/admin' : '' }/dashboard/gift`} >Gift</Link>
              </li>

              </Fragment>
            </ul>
          </li>
        </ul> 
        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {isAuthenticated() && (
            <Fragment>
               <li className="nav-link" style={{cursor: "pointer"}} onClick={signout}>Signout</li>
             </Fragment>
          )}
        </ul>


      </div>
    </div>
  </nav>
</div>
)
}

export default Navbar