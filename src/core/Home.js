import React from 'react'
import headerImage from '../images/group-member.jpg'
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth/helpers"
import {API_URL} from "./../config"
import toastr from 'toastr';
import "toastr/build/toastr.css";

function Home(props) {
    
    const {participant, token} = isAuthenticated()

    const createGroup = () => {
        fetch(`${API_URL}/groupMember/create/${participant._id}`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify({participant})._id
        }).then(res => res.json())
          .then(res => {
              if(res.error){
                toastr.warning(res.error, 'Please Check Click !', {
                   positionClass: "toastr-bottom-left"
                })
              }else{
                toastr.success('Group Member is Created', 'Welcome in Your Group Member', {
                   positionClass: "toastr-bottom-left"
                })

                localStorage.setItem('group_member', JSON.stringify(res))
                props.history.push('/group_member')
              }
          })
    }

    // =================== Start Code Creation Method Rejoindre in Group Member ============================
    const rejoindre = () => {
         const codeStorage = localStorage.getItem('group_member')
         const code = JSON.parse(codeStorage).groupMember.code;
         
         fetch(`${API_URL}/groupMember/rejoindre/${code}`,{
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body : JSON.stringify({participant})._id
         }).then(res => res.json())
           .then(res => {
               if (res.error){
                toastr.warning(res.error, 'Please Check Click !', {
                   positionClass: "toastr-bottom-left"
                })
               }else{
                toastr.success('Group Member is Created', 'Welcome in My Group Member', {
                   positionClass: "toastr-bottom-left"
                })

                localStorage.setItem('rejoindre', JSON.stringify(res))
                props.history.push('/group_member')
               }
           })
    }

    return (
        <div className="container py-5">
          <div className="row align-items-center">
              <div className="col-12 col-lg-6">
                 <h1>Create Your Group Member</h1>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iure consectetur sint, id vitae dolorum ea animi laborum praesentium voluptates.</p>
                 <div className="row">
                     <div className="col-12 col-md-6">
                        <div className="d-grid">
                            <Link className="btn btn-primary" onClick={createGroup}>Create Group Member</Link>
                        </div>
                     </div>
                     <div className="col-12 col-md-6">
                        <div className="d-grid">
                            <Link className="btn btn-primary" onClick={rejoindre}>Rejoindre</Link>
                        </div>
                     </div>
                 </div>
              </div>
              <div className="col-12 col-lg-6">
              <img src={headerImage} alt=""/>
              </div>
          </div>
        </div>
    )
}

export default Home
