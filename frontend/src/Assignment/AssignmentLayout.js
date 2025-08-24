import React from 'react';
import Assignmentlist from './Assignmentlist';

import { useState } from 'react';
import axios from "axios"; 
import { useEffect } from 'react';



const  AssignmentLayout=()=> {


    const [Array1,change1]=useState([]);

    const [Array2,change2]=useState([]);


    const setdataaccor=(Array)=>{
        const d1=new Date();
        d1.setHours(0,0,0,0);
        d1.setDate(d1.getDate() + 0);
        
      const temp1=Array.filter((elem,index)=>{
          const d2 =new Date(elem.date);
          d2.setHours(0,0,0,1);
  
          

          if(d1.getTime() < d2.getTime()){
              return true;
          }else{
              return false
          }
      })

      change1(temp1);

      const temp2=Array.filter((elem,index)=>{
          const d2 =new Date(elem.date);
          d2.setHours(0,0,0,1);

          if(d1.getTime() >= d2.getTime() ){
              return true;
          }else{
              return false
          }
      })

      change2(temp2)
    }

    const getassigndata=()=>{
    axios.get(`${process.env.REACT_APP_PREURL}/getassigndata`,{withCredentials: true})
    .then((response)=>{


        if(Array.isArray(response.data)){
            const sortarr=response.data.sort((b,a)=>{

                const ad=new Date(a.date);
                const bd=new Date(b.date);
        
                return ad.getTime()-bd.getTime();
        
              })
        
        
             setdataaccor(sortarr);

        }

    })
    .catch(error=>{
    
    })
    
    }
    
    useEffect(() => {
      
      getassigndata();
  
    }, [])

    const props_data="You're Assignments will appear here !";


    return (
        <>

            <p className="text-center h3 mx-auto fw-bold" style={{fontFamily: "Nunito",fontWeight:"bold",color:'deepskyblue'}}>{props_data}</p>

            <div className='justify-content-center' style={{display:'flex',padding:'5px',flexWrap:'wrap',margin:'5px'}} >

 <div style={{margin:'15px',padding:'10px',borderRadius:'8px',width:'100%',boxShadow:'inset 0 0 2px #000000'}}>
                    
                    <h2 style={{fontFamily:'Roboto',marginBottom:'30px',textAlign:'center',marginTop:'15px',color:'red'}}>Upcoming Assignments</h2>
                    {Array1.map((eachItem) => (
                    <Assignmentlist Class1={eachItem} />
                ))}
                </div>

                 
                <div style={{margin:'15px',marginTop:"25px",padding:'10px',borderRadius:'8px',width:'100%',boxShadow:'inset 0 0 2px #000000'}}>
                    
                    <h2 style={{fontFamily:'Roboto',marginBottom:'30px',textAlign:'center',marginTop:'15px',color:'red'}}> Past Assignments</h2>
                    {Array2.map((eachItem) => (
                    <Assignmentlist Class1={eachItem} />
                ))}
                </div>
            </div>
        </>

            
        
    )
}

export default AssignmentLayout
