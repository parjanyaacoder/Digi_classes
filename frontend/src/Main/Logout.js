import React from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';

import { useNavigate } from 'react-router';

const Logout=()=>{

   const history=useNavigate();

    const componentDidMount=()=>{
       
        axios.get(`${process.env.REACT_APP_PREURL}/logout`,{withCredentials: true})
            .then((response) =>{
              
              history('/clilogin');
  
  
            } )
            .catch(error => {
  
              if(error.response){
                alert(error.response.data);  
              }
  
              else{
                alert('Logout Failed!-- Try Again');
           
              }
                 });
    }
  

      const onSubmits=(event)=>{
        let bar = window.confirm(`Press OK to LOGOUT`);
        if(bar){
          componentDidMount();
        }

      }



    return(
        <>
            <Button onClick={onSubmits} variant="outlined" color="secondary" className="mx-auto" >Logout</Button>
        </>
    )
}

export default Logout;