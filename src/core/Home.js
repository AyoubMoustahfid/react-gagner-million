import React from 'react'
import headerImage from '../images/group-member.jpg'
import {Link} from "react-router-dom"
import {isAuthenticated} from "../auth/helpers"
import {API_URL} from "./../config"
import toastr from 'toastr';
import "toastr/build/toastr.css";
import axios from "axios"

function Home(props) {
    
    const {participant, token} = isAuthenticated()

    const createGroup = () => {
       axios.post(`${API_URL}/groupMember/create/${participant._id}`, {participant: participant._id}, {
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

                localStorage.setItem('group_member', JSON.stringify(res.data))

                props.history.push('/group_member')
           }
       })
    }

    // =================== Start Code Creation Method Rejoindre in Group Member ============================
    const rejoindre = () => {
         var codeStorage = localStorage.getItem('group_member')
         const code = JSON.parse(codeStorage).data.groupMember.code;


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

             
                const participant = JSON.parse(codeStorage).data.groupMember.participant
                
                if(participant.length > 3){
                    props.history.push('/group_member')
                }else{
                    return toastr.error('If you check are 4 participant in Group', 'Has not 4 participant', {
                        positionClass: "toastr-bottom-left"
                    })
                }
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
