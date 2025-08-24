import React from 'react';


import BallotOutlinedIcon from '@material-ui/icons/BallotOutlined';



import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

import img from '../Login/images/prof_img.jpg'

import { Link} from 'react-router-dom'

import { useNavigate } from 'react-router';

import { Button } from '@material-ui/core';
import axios from 'axios';


const Home1=( props )=>{

  const history=useNavigate();

   const {ClassDetails} = props
   const {name, role, back} = ClassDetails

    const openassignment=()=>{
      // console.log(history);
      history("/cliassignmentlist")
    }

    const removesub=()=>{

      

      const namesrm={"classname":name};
      try {

        let bar = window.confirm(`Press ok to Unenroll from the class room named as: ${name}`);

        if(bar){
          axios.post(`${process.env.REACT_APP_PREURL}/delete`,namesrm,{withCredentials:true})
          .then((response)=>{
            // console.log("iam in a axios delete")

            history("/clihome");
          })
          .catch(error=>{

          })
        }else{
            // console.log(bar);
            console.log("does not provide any input");
        }
        
      } catch (error) {
        
      }

    }

    return(
    <>
    

        
      <div className="card" style={{width:'20rem', display:'flex',flexDirection:'column',backgroundColor:'white',margin:'20px',borderRadius:'10px',
          boxShadow: "1px 1px 1px #9E9E9E"}}>
        <div style={{width:'100%',borderTopLeftRadius:'10px',borderTopRightRadius:'10px',
        backgroundImage:`url(${back})`,padding:'15px',backgroundSize:'cover'}}>
            
        
             <span className="mx-auto"><Link to="/dashboard" style={{letterSpacing:'0.5em',textTransform:'uppercase',color:'aqua',textDecoration:'none'}}> <span className="display-5" style={{margin:'15px',padding:"5px",textShadow:'3px 0px 1px #ff0000'}}> {name} </span></Link></span>
            
        </div>  
        
        <div style={{marginRight:'10px'}}>
            
        <p style={{color:'grey',"paddingLeft":'5px'}}><span>Instructor:</span> <h4 style={{fontWeight:'bold',textTransform:'uppercase',letterSpacing:'0.2em'}}>{role}</h4> </p>

            <div style={{display:'flex',justifyContent:'flex-end'}}>
               <img src={img} style={{marginLeft:'auto',width:'15%',height:'15%',borderRadius:'15%'}} alt="avatar" />
            </div>
            <span><Button><BallotOutlinedIcon fontSize="large" onClick={openassignment} style={{cursor:'pointer',color:'black',marginLeft:'auto',marginRight:'10px'}}/></Button></span>
            <span><Button><DeleteForeverOutlinedIcon fontSize="large" onClick={removesub} style={{cursor:'pointer',color:'black',marginLeft:'auto'}}/></Button></span>
            <div className='pb-4'></div>
        </div>
        
        
      
      
       </div> 
     </>    
        
  )
}


export default Home1