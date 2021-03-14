import React,{useState, useEffect} from 'react'
import {API_URL} from "./../config"
import {isAuthenticated} from "./../auth/helpers"
import axios from "axios"

import toastr from 'toastr';
import "toastr/build/toastr.css";



function Dashboard() {

    const [quest, setQuest] = useState('')
    const [answer, setAnswer] = useState('')
    const [false_choices, setFalseChoices] = useState('')
    const [points, setPoints] = useState('')


    const [questions, setQuestion] = useState('')

    const submitQuestion = e => {
        e.preventDefault();

        const {participant, token} = isAuthenticated()

        let false_choices_array = false_choices.split(",");

        const questions = {
            quest: quest,
            answer: answer,
            false_choices: false_choices_array,
            points: points,
        }

        axios.post(`${API_URL}/question/create/${participant._id}`, questions, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
           if(res.error) {
            toastr.warning(res.error, 'Please Check form !', {
                    positionClass: "toast-bottom-left",
                })
           }else{
            toastr.success(`Question created`, 'new Question', {
                    positionClass: "toast-bottom-left",
                })

                setQuestion("")
           }

        })
    }

    useEffect(() => {
        const {participant, token} = isAuthenticated()
        axios.get(`${API_URL}/question/${participant._id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if(res.error) {
                toastr.warning(res.error, 'Please Check Data base !', {
                    positionClass: "toast-bottom-left",
                })
            }else{
                setQuestion(res.data.questions)
            }
            
        }).catch(err => {
            console.log(err);
        })
    })


return (
<div className="container">
  
   <div className="row">
   <div className="col-12">
    <form onSubmit={submitQuestion}>
        <div class="mb-3">
            <label htmlFor="quest" className="form-label">Question</label>
            <input onChange={e => setQuest(e.target.value)} value={quest} type="text" className="form-control" id="quest" aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
            <label htmlFor="answer" className="form-label">Answer</label>
            <input onChange={e => setAnswer(e.target.value)} value={answer}  type="text" className="form-control" id="answer" />
        </div>

        <div className="mb-3">
            <label htmlFor="false_choices" className="form-label">Choices 1</label>
            <input onChange={e => setFalseChoices(e.target.value)} type="text" className="form-control" id="false_choices" />
        </div>

        <div className="mb-3">
            <label htmlFor="points" className="form-label">Point</label>
            <input onChange={e => setPoints(e.target.value)}  type="number" className="form-control" id="points" />
        </div>

        <div className="d-grid">
            <button type="submit" className="btn btn-primary">Create Question</button>
        </div>
    </form>
    </div>
    <div className="col-12 my-4">
    <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Point</th>
                    </tr>
                </thead>
                <tbody>
                   {questions && questions.map((item, i) => (
                    <tr key={item._id}>
                        <td>{item.quest}</td>
                        <td>{item.answer}</td>
                        <td>{item.points}</td>
                    </tr>
                   ))}
                </tbody>
    </table>
    </div>
   </div>
</div>
)
}

export default Dashboard