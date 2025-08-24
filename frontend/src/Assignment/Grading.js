import React from 'react';
import Gradinglist from './Gradinglist';

import { useState } from 'react';
import axios from "axios"; 
import { useEffect } from 'react';

import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';

const  GradingLayout=()=> {
    
    const [age, setAge] = useState('');
    const [array,setarray]=useState([]);

    const getallclassname=()=>{
  
      try {
        axios.get(`${process.env.REACT_APP_PREURL}/getallclassname`,{withCredentials: true})
        .then((response)=>{
          
          if(Array.isArray(response.data)){
            setarray(response.data) 
          }
          
          
          
        })
        .catch(error=>{
            // console.log(error)
        })
        
      } catch (error) {
        
      }

    }
  
  
    useEffect(() => {
   getallclassname()
    }, [])

    const BasicSelect=()=>{
      
    
      
    
      const handleChange = (event) => {
        setAge(event.target.value);
      };
    

  
      return (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
              defaultValue={'pandey'}
            >

    
              {
                array.map((elem,index)=>{
                return <MenuItem value={elem}>{elem}</MenuItem>
              })
              }
    
            </Select>
          </FormControl>
        </Box>
      );
  
  
    }
 

    const [Arrays,change]=useState([]);


    const getassigndata=()=>{

    axios.post(`${process.env.REACT_APP_PREURL}/getstuassigndata`,{"classname":age},{withCredentials: true})
    .then((response)=>{


        if(Array.isArray(response.data)){
            change(response.data.reverse());
        }
     

    })
    .catch(error=>{
    console.log(error)
    })
    
    }


    const props_data="Assignments Submitted by student's will appear here !";


    const senddata=()=>{

        if(age!==''){
            getassigndata();
        }
       
    }

  
    return (
        <>
 
            <div className='justify-content-center' style={{display:'flex',padding:'5px',flexWrap:'wrap',margin:'5px'}}>
    <div style={{margin:'10px',padding:'10px',borderRadius:'8px',width:'500px',boxShadow:'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}>


       <span className="text-center"><h3 style={{fontWeight:"normal", fontFamily:'Roboto',marginBottom:'0px',padding:'5px',color:'red'}}>Get Student's Uploaded Assignment's !</h3></span>
      <BasicSelect />
      <Button onClick={senddata} className="float-end" variant="contained" color="secondary" style={{marginTop:'5px'}}>
          Get
        </Button>
      </div>
      </div>

            <p className="text-center h3 mx-auto fw-bold" style={{fontFamily: "Nunito",fontWeight:"bold",color:'deepskyblue'}}>{props_data}</p>

            <div className='justify-content-center' style={{display:'flex',padding:'5px',flexWrap:'wrap',margin:'5px'}} >
 
                <div style={{margin:'15px',padding:'5px',borderRadius:'8px',width:'100%',boxShadow:'inset 0 0 2px #000000'}}>
                    
                    {Arrays.map((eachItem) => (
                    <Gradinglist Class1={eachItem} />
                ))}
                </div>

            </div>
        </>

            
        
    )
}

export default GradingLayout
