import { useEffect, useState } from 'react';
import axios from 'axios';
import background from "../images/gift.png"
import {API_URL} from "./../config"


const Winner = () => {

    const [winner ,setWinner] = useState('');

    const [gift ,setGift] = useState('');

    useEffect(()=>{
        let idWinner = localStorage.getItem("idWinner");

        let idGift = localStorage.getItem("idGift");

        console.log('====================================');
        console.log(idWinner);
        console.log('====================================');

        axios.get(`localhost:8080/api/participant/${idWinner}`)
        .then( (response) => {
          console.log(response.data);
          setWinner(response.data)
           
        
        }).catch(function (err) {
          console.log(err);
      });


      axios.get(`${API_URL}/gift/getGift/${idGift}`)
      .then(function (response) {
       
        setGift(response.data)
          console.log(response.data);
      
      }).catch(function (err) {
        console.log(err);
    });

    
       
    
      
      },[])

    return ( 
        <div className="container">
          <div className="row align-items-center">
          
            <div className="col-6">
                <img src={background}/>
            </div>

            <div className="col-6">
            <h1>The Winner is :  </h1>
            <h1>{winner.username}</h1>
            <h1>Gift :{gift.name} </h1>
            </div>
          </div>
           
        </div>
     );
}
 
export default Winner;