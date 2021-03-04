import React from 'react'
import headerImage from '../images/group-member.jpg'
import {Link} from "react-router-dom"

function Home() {
    return (
        <div className="container py-5">
          <div className="row align-items-center">
              <div className="col-12 col-lg-6">
                 <h1>Create Your Group Member</h1>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iure consectetur sint, id vitae dolorum ea animi laborum praesentium voluptates.</p>
                 <div className="d-grid">
                    <Link className="btn btn-primary" to="/group_member">Create Group Member</Link>
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
