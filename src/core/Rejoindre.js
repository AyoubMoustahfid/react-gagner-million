import React, {useState} from 'react'
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth/helpers"
import {API_URL} from "./../config"
import toastr from 'toastr';
import "toastr/build/toastr.css";
import axios from "axios"

function Rejoindre(props) {

    const [code, setCode] = useState("")

    const handleChange = e => {
        setCode({...code, [e.target.id]: e.target.value})
    }

    const {participant, token} = isAuthenticated()

        // =================== Start Code Creation Method Rejoindre in Group Member ============================
        const rejoindre = (e) => {
            e.preventDefault()

            axios.put(`${API_URL}/groupMember/rejoindre/${code}`, {participant: participant._id}, {
              headers: {
                  "Authorization": `Bearer ${token}`
              }
          }).then(res => {
              if(res.error){
               toastr.warning(res.error, 'Please Check Click !', {
                      positionClass: "toastr-bottom-left"
                   })  
              }else{
               toastr.success('Group Member is Created', 'Welcome in Your Group Member', {
                      positionClass: "toastr-bottom-left"
                })
                 console.log(res.data);
                   props.history.push('/game')
                  
              }
          })
           
       }


    // Formulaire Code Rejoindre
    const form = () => (

        <form onSubmit={rejoindre}>
        
        <div className="mb-3">
            <label htmlFor="code" className="form-label">Entrer Code Group</label>
            <input   value={code} onChange={(e)=> setCode(e.target.value)} type="text" className="form-control" id="code"/>
        </div>

        <div className="d-grid my-3">
         <button className="btn btn-primary">Joindre Group</button>
        </div>
        </form>
    )
   
    return (
        <div className="container">
           <div className="row">
            <div className="col-12 mx-auto">
            {form()}
            </div>
           </div>
        </div>
    )
}

export default Rejoindre
