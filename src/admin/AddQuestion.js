import React, {useState, useEffect} from 'react'
import {API_URL} from "./../config"
import {isAuthenticated} from "./../auth/helpers"
import axios from "axios"

import toastr from 'toastr';
import "toastr/build/toastr.css";

function AddQuestion() {
       
    const [participants, setParticipant] = useState("");

    const  activeParticipant = (id)  => {
        axios.put(`${API_URL}/valid/${id}`)
        .then(res =>{
            if(res.error){
                toastr.warning(res.error, 'Participant not found with id !', {
                    positionClass: "toast-bottom-left",
                })
            }else{
                toastr.success(res.error, 'Your Account is Activated', {
                    positionClass: "toast-bottom-left",
                })
            }
        })
    }

    useEffect(() => {
        const {participant, token} = isAuthenticated()


axios.get(`${API_URL}/participant/allParticipant/${participant._id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(res =>{
    setParticipant(res.data.participants);
   
})
 })
      
    return (
        <div className="container-fluid">
            <h3>All participants</h3>
            <div className="row">
                <div className="col-12">
                <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Username</th>
                        <th>email</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>is valid</th>

                    </tr>
                </thead>
                <tbody>
                   {participants && participants.map((item, i) => (
                    <tr key={item._id}>
                        <td>{item.username}</td>
                        <td>{item.email}</td>
                        <td>{item.age}</td>
                        <td>{item.phone}</td>
                        {item.is_valid && (
                            <td>is Valid</td>
                        )}
                        
                        {!item.is_valid && (
                            <td> <button className="btn btn-success" onClick={() => activeParticipant(item._id)}>Active</button></td>

                            )}
                            

                    </tr>
                   ))}
                </tbody>
    </table>
                </div>
            </div>
        </div>
    )

                    }
export default AddQuestion
