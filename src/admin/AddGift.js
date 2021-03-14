import React, {useState, useEffect} from 'react'
import {API_URL} from "./../config"
import {isAuthenticated} from "./../auth/helpers"
import background from "./../images/gift.png"
import axios from "axios"

import toastr from 'toastr';
import "toastr/build/toastr.css";


function AddGift() {

    const [gift, setGift] = useState('')

    const handleChange = e => {
        setGift({...gift, [e.target.id]: e.target.value})
    }

    const submitGift = e => {

        e.preventDefault();


        axios.post(`${API_URL}/gift/create`, gift)
             .then(response => {
                 if(response.error) {
                    toastr.warning(response.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })

                 }else{
                    toastr.success(`Gift created`, 'new Gift', {
                    positionClass: "toast-bottom-left",
                })

                    console.log(response);
                 setGift("")
                 }
             })
    }

   useEffect(() => {

       axios.get(`${API_URL}/gift/`)
            .then(response => {
                if(response.error) {
                    toastr.error(response.error, 'Error in server', {
                    positionClass: "toast-bottom-left",
                })

                 }else{
                  
                    console.log(response.data.gifts);
                    setGift(response.data.gifts)
                 }
            })
   })

    const form = () => (

        <form onSubmit={submitGift}>
  <div className="mb-3">
   
    <input type="text" onChange={handleChange} className="form-control" id="name"/>
  </div>

  <div className="d-grid">
  <button type="submit" className="btn btn-primary">Ceate Gift</button>
  </div>
</form>
    )
    return (
        <div className="container">
          <div className="row align-items-center">
              <div className="col-12 col-md-12 col-lg-6 ">
                <h1>Create Your Gift for Game</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. At, repudiandae dolorum asperiores possimus nam ut quae sit odio corrupti eos!</p>
              {form()}
              </div>
              <div className="col-12 col-md-12 col-lg-6">
                <img src={background}/>
              </div>
          </div>

          <div className="row">
            <div className="col-12">
            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>Name Gift</th>
                        <th>Create At</th>
                    </tr>
                </thead>
                <tbody>
                   {gift && gift.map((item, i) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.createdAt}</td>
                    </tr>
                   ))}
                </tbody>
    </table>
            </div>
          </div>
        </div>
    )
}

export default AddGift
