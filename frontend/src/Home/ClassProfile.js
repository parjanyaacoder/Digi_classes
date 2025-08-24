import Home1 from "./Home";

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Noclass from "./Noclass";


const Home =() => {

  const [ClassDetailsList,change]=useState([])

  const getdata=()=>{
  axios.get(`${process.env.REACT_APP_PREURL}/getclassdata`,{withCredentials: true})
  .then((response)=>{
    

    if(Array.isArray(response.data)){
      change(response.data) 
      console.log(ClassDetailsList)
    }
    
    
  })
  .catch(error=>{
  
  })
  
  }
  
  useEffect(() => {
    
    getdata();

  }, [])


  return(

    <>
    <Noclass data="Classes You're Enrolled In will appear here !" />

        <div className='justify-content-center' style={{display:'flex',flexDirection:'row',fontFamily:'Roboto',color:'white',flexWrap:'wrap'}}>

        
         {
            ClassDetailsList.map((eachItem) => (

              
          <>
           <Home1 ClassDetails={eachItem} />
          </>
          ))
          }
          
        
        </div>
    
  
  </>


  )
    
  }
export default Home