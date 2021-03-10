import React, {useState} from 'react'
import toastr from 'toastr';
import "toastr/build/toastr.css";

import {API_URL} from "./../config"

function Signup(props) {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        age : 0,
        phone: ""
    })

    const handleChange = e => {
        setUser({...user, [e.target.id]: e.target.value})
    }

    const submitSignup = e => {
        e.preventefault();

        fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
          .then(res => {
              if(res.error){
                  toastr.warning(res.error, "Please check from !", {
                      positionClass: "toastr-bottom-left",
                  })

                  props.history.push('/signin')
              }
          }).catch(err => toastr.error(err, "Server error !", {
              positionClass: "toastr-bottom-left"
          }))
    }

    const form = () => (
        <form onSubmit={submitSignup}>
        <div class="mb-3">
            <label htmlFor="username" className="form-label">UserName :</label>
            <input onChange={handleChange} type="text" className="form-control" id="username" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
            <label htmlFor="email" classNam="form-label">Email address :</label>
            <input onChange={handleChange} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
        </div>
        <div class="mb-3">
            <label htmlFor="password" classNam="form-label">Password :</label>
            <input onChange={handleChange} type="password" className="form-control" id="password"/>
        </div>

        <div class="mb-3">
            <label htmlFor="age" classNam="form-label">Age :</label>
            <input onChange={handleChange} type="number" className="form-control" id="age"/>
        </div>

        <div class="mb-3">
            <label htmlFor="phone" classNam="form-label">Phone :</label>
            <input onChange={handleChange} type="text" className="form-control" id="phone"/>
        </div>
 
        <div className="d-grid">
            <button type="submit" class="btn btn-primary">Signup</button>
        </div>
        </form>
    )

    return (
        <div className="container">
            <div className="row">
                <div className="col-6 mx-auto">
                  {form()}
                </div>
            </div>
        </div>
    )
}

export default Signup
