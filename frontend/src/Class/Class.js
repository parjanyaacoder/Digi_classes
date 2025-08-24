import React, {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Classlink from "./Classlink.js";
import axios from 'axios';
import { useEffect } from 'react';

const  Calendarmod=()=>{



const [datearray,setdatearray]=useState([]);

const [show,setshow]=useState([]);

const [dateState, setDateState] = useState(new Date())

const [array,setarray]=useState([]);

const updateshow=()=>{       
    const temp1=new Date(dateState);

    setshow(datearray.filter((elem,index)=>{
        const temp2=new Date(elem.date);



        if((temp1.setHours(0,0,0,0))===(temp2.setHours(0,0,0,0))){
            return true;
        }else{
            return false;
        }

    }))
}


const getdates=()=>{

    try {
      axios.get(`${process.env.REACT_APP_PREURL}/getdate`,{withCredentials: true})
      .then((response)=>{

        if(Array.isArray(response.data)){
            setdatearray(response.data)
 }
        
        
        
      })
      .catch(error=>{
      setdatearray([])
      })
      
    } catch (error) {
      
    }

  }

  const changeDate = (e) => {
    setDateState(e);

}

const getallclassname=()=>{
// console.log("GET all classname")
    try {
      axios.get(`${process.env.REACT_APP_PREURL}/getallclassname`,{withCredentials: true})
      .then((response)=>{
        
        // console.log(response)

        if(Array.isArray(response.data)){
          setarray(response.data) 
        }
        
        
        
      })
      .catch(error=>{
      setarray([])
      })
      
    } catch (error) {
      console.log("error")
      console.log(error)
    }

  }

  useEffect(() => {
    getallclassname();
     }, [])

     useEffect(()=>{
         getdates();
     },[array])

     useEffect(()=>{
        updateshow();
     },[datearray,dateState])

  return(
    <>

     <div className='justify-content-center' style={{display:'flex',padding:'10px',flexWrap:'wrap',margin:'5px'}} >

  <Calendar className="react-calendar m-auto"
      value={dateState}
      onChange={changeDate}

      />
 
      
      <div className="m-auto" style={{display:'flex',flexDirection:'column',borderRadius:'7px',margin:'10px',padding:'10px',boxShadow:'inset 0 0 2px #000000'}}>
    <div>Click on a Date to view Classes for the particular day !</div>

           { show.map((elem,index)=>{

               const datetoshow=new Date(elem.date);
                return(
                    <>
                    <div style={{boxShadow:'inset 0 0 2px #000000'}}>
            <div style={{fontFamily:'Roboto',margin:'5px'}}><span  style={{color:'red',fontWeight:'bold'}}>Course: </span> {elem.classname}</div>
          
            <div style={{fontFamily:'Roboto',margin:'5px',cursor:'pointer'}}><span style={{color:'red',fontWeight:'bold'}}>Link: </span> <span style={{textDecoration:'underline'}}><a href={`${elem.link}`} target="_blank" rel="noopener noreferrer" >{elem.link}</a></span></div>
            <div style={{fontFamily:'Roboto',margin:'5px'}}><span  style={{color:'red',fontWeight:'bold'}}>Time: </span> {datetoshow.toLocaleTimeString()}</div>
            </div>
            </>
                )
            })

           }

    </div>   
      
    

     </div> 
     <Classlink array={array} />
    
    </>
  )
}

export default Calendarmod
