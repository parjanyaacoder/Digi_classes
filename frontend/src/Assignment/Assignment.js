import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import img from '../Login/images/prof_img.jpg'

import { forwardRef } from 'react';

import axios from 'axios';
import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },

    bullet: {
        
            width: '100%',
            height:'auto',
            border: `2px `,
            borderRadius:8,
            padding:25,
            marginBottom:40,

            margin:'auto',
            marginTop:'10px',
            
            
      

    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  



const UploadButtons=()=> {
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
      setarray([])
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


  const [message,setmessage]=useState('')

  const [DISPLAY,setdisplay]=useState('none')
  
  const [CLASS,setclass]=useState('alert-danger')


  const header='Class Announcement (type here):';

  const [value,setvalue]=useState('');
  const [valuetitle,setvaluetitle]=useState('');

  const classes = useStyles();
  
  const [file, setFile] = useState(new File(["No Attachments (i.e no file is attached) with this Assignment !"], "None.txt", {type: "text/plain"}));


  const [startDate, setStartDate] = useState(new Date());
 
  const save=(e)=>{
    setFile(e.target.files[0]);

  }


  const changedt=(event)=>{
    setvalue(event.target.value)

  }
  const changedttitle=(event)=>{
    setvaluetitle(event.target.value)
    

  }

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
   
    formData.append("classname",age);
    formData.append("announce",value);
    formData.append("title",valuetitle);
    formData.append("due",startDate);

    
  
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PREURL}/upload`,
        formData,{withCredentials:true}
      );


        setmessage('Assignment successfully Uploaded !')
        setclass('alert-success')
        setdisplay('block')

        setTimeout( function() {
          setAge('')
          setvaluetitle('');
          setdisplay('none');
          document.getElementById('contained-button-file').value= null;
          setStartDate(new Date());
          setFile(new File(["No Attachments (i.e no file is attached) with this Assignment !"], "None.txt", {type: "text/plain"}));
          setvalue('');}, 1000);


    } catch (ex) {

      setmessage('Failed Uploading Assignment !-- Try Again')
      setclass('alert-danger')
      setdisplay('block')
    }
  };

  
  const senddata=()=>{
  



    if(age===''){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Select a Class Room !')
    }
    else if(valuetitle===''){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Title is Empty !')
    }
    else if(value===''){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Class Announcement is Empty !')
    }
    else if(value.length > 1000){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Class Announcement word limit exceeded (max 1000 characters) !')
    }
    else if(file===undefined){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('Choose a file !')
   
    }
    else if(file.size>5000000){
      setdisplay('block')
      setclass('alert-danger')
      setmessage('File size of max 5mb can be uploaded !')
   
    }
    else{
      setdisplay('none')
      uploadFile();
    }
    
  }
  

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
      customInput={<ExampleCustomInput />}
      minDate={new Date()}
      maxDate={addYears(new Date(), 2)}
      showDisabledMonthNavigation
      dateFormat="dd/MM/yyyy"
      selected={startDate}
      onChange={(date) => setStartDate(date)} />
      
    );
  };

  return (

      <>


    <div className='justify-content-center' style={{display:'flex',padding:'5px',flexWrap:'wrap',margin:'5px'}}>
    <div style={{margin:'10px',padding:'10px',borderRadius:'8px',width:'500px',boxShadow:'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'}}>


       <span className="text-center"><h1 style={{fontFamily:'Roboto',marginBottom:'0px',padding:'5px',color:'red'}}>Assignment Upload</h1></span>
      <BasicSelect />
      <div className={classes.bullet} style={{marginBottom:'10px',boxShadow:'rgba(0, 0, 0, 0.24) 0px 1px 1px',width:'100%'}}>
         <span>
          <img src={img} alt='' style={{width:'50px',borderRadius:'25px',marginRight:'30px'}}/>
        </span>
          <span className="text-center" style={{width:'100%', fontFamily:"Roboto",marginTop:'10px',color:'rgba(0,0,0,0.549)',fontWeight:'bold'}}>Announce Something to your class ! </span>

      </div>

      <p className={`alert ${CLASS}  mt-1`} style={{display:DISPLAY}} role="alert" id="alert_box">{message}</p>
      
      <div className='d-flex mx-auto' >
      <span className='mx-auto' style={{}}>Select Due Date: </span>
      <span className='mx-auto'><Datepicker /></span>
      </div>
      
      
      <div className='d-flex mx-auto' >
      <TextField
          id="outlined-multiline-static"
          label="Title:"
          multiline
      
          
         inputProps={{"value":valuetitle}}

          InputLabelProps={{ shrink: true }} 

          variant="standard"
          style={{width:"100%",marginBottom:'1px'}}

          onChange={changedttitle}
        />
        </div>
              <div className='d-flex mx-auto' >

      <TextField
          id="outlined-multiline-static"
          label={header}
          multiline
          rows={3}
          
         inputProps={{"value":value}}

          InputLabelProps={{ shrink: true }} 

          variant="standard"
          style={{width:"100%",marginBottom:'5px'}}

          onChange={changedt}
        />
      </div>


      <input style={{margin:'5px'}}
        accept="*"
        
        id="contained-button-file"
        type="file"
        onChange={save}
      />


        <Button onClick={senddata} className="float-end" variant="contained" color="secondary" style={{margin:'2px'}}>
          Post
        </Button>

</div>
    </div>
    </>
  );
}

export default UploadButtons