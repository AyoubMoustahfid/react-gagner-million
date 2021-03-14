import React, {useState, useEffect, Fragment} from 'react'
import axios from "axios"
import {isAuthenticated} from "../auth/helpers"
import {API_URL} from '../config'
import toastr from 'toastr';
import "toastr/build/toastr.css";

function Play(props) {
  const [question, setQuestion] = useState(null)
  const [questionNum, setQuestionNum] = useState(1)

  const [participantReady, setParticipantReady] = useState(true)



  let handleClick = (answer, questionId) => {

    let questionCount = questionNum
    let {participant, token} = isAuthenticated()

    if(questionCount < 15){

      axios.get(`${API_URL}/question/random/`).then(res => {
        if(res.error) {
          toastr.warning(res.error, 'Please Check Question !', {
                  positionClass: "toast-bottom-left",
          })
         }else{
         console.log(res.data);
          
          setQuestion(res.data)
          setQuestionNum(questionCount + 1)
         }
      }).catch(err => {
        toastr.error(err, 'Server is not responding', {
          positionClass: "toast-bottom-left",
      })
      })

         // create round
         let idGroup = localStorage.getItem('group_member')

         const round = {
          
           question : questionId,
           participant : participant,
           participant_answer : answer
   
         };
   
   
         let groupId = JSON.parse(idGroup)._id
   
         axios.post(`${API_URL}/round/create/${groupId}`, round)
         .then(res => {
           console.log(res.data);
         })
    
        }else{
          let idGroup = localStorage.getItem('group_member')

          let groupId = JSON.parse(idGroup)._id

          axios.post(`${API_URL}/finalwinner/create/${groupId}`)
            .then(res => {
              localStorage.setItem('idWinner', res.data.participant)
              localStorage.setItem('idGift', res.data.gift)
            
            
            }).catch(err => {
              toastr.error(err, 'Server is not responding', {
                positionClass: "toast-bottom-left",
            })
            })

            props.history.push('/winner')

        }

  }

  useEffect(() => {
    let idGroup = localStorage.getItem('group_member')
    
    
   let groupId = JSON.parse(idGroup)._id
   

    axios.post(`${API_URL}/round/create/${groupId}`)
         .then((response) => {
           console.log(response.data.error)
           if(response.data.error){
             setParticipantReady(false)
           }
         }).catch(err => {
           console.log(err);
         })

      
         axios.get(`${API_URL}/question/random/`).then((response) => {
          
          setQuestion(response.data);
         }).catch(err => {
           console.log(err);
         })

  }, [])

  
  return ( 
    <div className="play">
    {!participantReady ? (
      <div className="endGame">
      <h1>You need 4 player to Start the game ! </h1>
  </div>
 ):(
     <Fragment>
         <div className="container ">
            <p>{questionNum} /15</p>
            {/* <h3>He is Light Yagami. He is the main character of ….. anime.</h3> */}

            <h3>{ question && question.quest}</h3>

          
  
           <div className="row justify-content-around">
           <div className="col-12">
              <button type="button" onClick={()=>{ handleClick(question.answer,question._id) }}   className="btn btn-light ">{ question && question.answer} </button>
           </div>
           <div className="col-5  btn btn-danger">
             <button type="button"  onClick={()=>{ handleClick(question && question.false_choices[0], question._id) }}  className="btn btn-danger">{ question && question.false_choices[0]}</button>
           </div>
           <div className="col-5 btn btn-primary">
           <button type="button"  onClick={()=>{ handleClick(question && question.false_choices[1], question._id) }}  className="btn btn-primary">{ question && question.false_choices[1]}</button>
         </div>
         </div>
           
        </div>
     </Fragment> 
 )


 
 }
 
      
    </div>
 );
}

export default Play
