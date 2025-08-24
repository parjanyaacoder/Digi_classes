import * as React from 'react';

import Button from '@material-ui/core/Button';

import { useState } from 'react';
import TextField from '@material-ui/core/TextField';



import { forwardRef } from 'react';

import axios from 'axios';
import { Box } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';

import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const UploadButtons=(props)=> {
  const [age, setAge] = useState('');
  const BasicSelect=()=>{
    
  
    const array=props.array;
  
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


  const [message,setmessage]=useState('')

  const [DISPLAY,setdisplay]=useState('none')
  
  const [CLASS,setclass]=useState('alert-danger')

  const [valuetitle,setvaluetitle]=useState('');

  const [startDate, setStartDate] = useState(new Date());


  const changedttitle=(event)=>{
    setvaluetitle(event.target.value)
  }

 
  
  const senddata=()=>{

    if(age===''){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Select a Class Room !')
    }
    else if(valuetitle===''){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Please provide Link !')
    }
    else{
      setdisplay('none')
      uploadFile();
    
    }
    
  }
  
  const uploadFile = async (e) => {
      
    const formData = new FormData();

    startDate.setSeconds(0,0);

    formData.append("classname",age);
    formData.append("link",valuetitle);
    formData.append("date",startDate);


 
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PREURL}/dateupload`,
        formData,{withCredentials:true}
      );
      

        setmessage('Successfully Uploaded !')
        setclass('alert-success')
        setdisplay('block')

        setTimeout( function() {setdisplay('none');setAge('');setvaluetitle('');setStartDate(new Date());}, 1000);
        

    } catch (ex) {
        console.log(ex)
      
      setmessage('Failed Uploading !-- Try Again')
      setclass('alert-danger')
      setdisplay('block')
    }
  };


  const Datepicker = () => {


   
    const addYears=(a,b)=>{
      a.setFullYear(a.getFullYear() + b);
      return a;
    }
    
    
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
      <button className="example-custom-input" onClick={onClick} ref={ref}>
        {value}
      </button>
    ));
    
    

    return (
      <DatePicker
      
      showTimeSelect 
    customInput={<ExampleCustomInput />} 
      minDate={new Date()} 
      maxDate={addYears(new Date(), 2)} 
      showDisabledMonthNavigation 
      dateFormat="dd/MM/yyyy h:mm aa" 
      selected={startDate} 
    onChange={(date) => setStartDate(date)} 
      shouldCloseOnSelect={false} 
       />
      
      
    );
  };

  return (

      <>
    <div className='justify-content-center' style={{display:'flex',padding:'5px',flexWrap:'wrap',margin:'5px'}}>
    <div style={{margin:'10px',padding:'10px',borderRadius:'8px',width:'500px',boxShadow:'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}>


       <span className="text-center"><h4 style={{fontWeight:"normal",fontFamily:'Roboto',marginBottom:'0px',padding:'5px',color:'red'}}>Instructor can Set Link and Time for a course !</h4></span>
      <BasicSelect />

      <p className={`alert ${CLASS}  mt-1`} style={{display:DISPLAY}} role="alert" id="alert_box">{message}</p>
      
      <div className='d-flex mx-auto mt-2' >
      <span className='mx-auto' style={{}}>Select Class Timing: </span>
      <span className='mx-auto'><Datepicker /></span>
      </div>
      
      
      <div className='d-flex mx-auto' >

      <TextField
          id="outlined-multiline-static"
          label="Link:"
          multiline
      
          
         inputProps={{"value":valuetitle}}

          InputLabelProps={{ shrink: true }} 

          variant="standard"
          style={{width:"100%",marginBottom:'1px'}}
         

          onChange={changedttitle}
          placeholder="Paste the conference link here ."
        />
        </div>
    


        <Button onClick={senddata} className="float-end" variant="contained" color="secondary" style={{margin:'2px'}}>
          Post
        </Button>

</div>
    </div>
    </>
  );
}

export default UploadButtons