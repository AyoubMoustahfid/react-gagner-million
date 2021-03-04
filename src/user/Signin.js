import React, {useState} from 'react'
import Layout from "../core/Layout"
import toastr from "toastr";
import "toastr/build/toastr.css";

import {API_URL} from "./../config"

function Signin(props) {

    const [user, setUser] = useState({
        email : "",
        password : ""
    })

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value})
    }


    const submitSignin = e => {
        e.preventDefault();

        fetch(`${API_URL}/signin`, {
            method: "POST",
            headers : {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
          .then(res => {
              if(res.error){
                  toastr.warning(res.error, "Please Check form !", {
                      positionClass: "toastr-bottom-left"
                  })
              }else{
                  toastr.info("User is authenticated Succefully", "Welcome", {
                      positionClass : "toastr-bottom-left"
                  })

                  localStorage.setItem('jwt_info', JSON.stringify(user))
                  props.history.push('/')
              }
          }).catch(err => toastr.error(err, "Server error !", {
              positionClass: "toastr-bottom-left"
          }))
    }

    const form = () => (
      <div>
      <form onSubmit={submitSignin}>
      <div class="mb-3">
          <label htmlFor="email" classNam="form-label">Email address</label>
          <input onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
          <label htmlFor="password" classNam="form-label">Password</label>
          <input onChange={handleChange} type="password" className="form-control" id="password"/>
      </div>

      <div className="d-grid">
          <button type="submit" class="btn btn-primary">Login</button>
      </div>
      </form>
      {JSON.stringify(user)}
      </div>
    )



    return (
        <div>
          <Layout title="Sign In" description="Sign in Node" className="container">
          <div className="row">
              <div className="col-6 mx-auto">
              { form() } 
              </div>
          </div>
            
          </Layout>
        </div>
    )
}

export default Signin
