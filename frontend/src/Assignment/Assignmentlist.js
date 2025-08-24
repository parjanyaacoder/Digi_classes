import React from 'react'
import TextField from '@material-ui/core/TextField';
import DownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import { CloudUploadOutlined } from '@material-ui/icons';
import {decode as atob, encode as btoa} from 'base-64';
import { Button } from '@material-ui/core';
import axios from "axios";

import { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";


const Assignmentlist=( props )=> {
    

    const { Class1 }=props
    const {uniqueNo,value,header,date,file,title}=Class1

    const d=new Date(date);
    const datemod=d.toDateString();
    
    const downloaddata=()=>{


        try {
            axios.post(`${process.env.REACT_APP_PREURL}/downloadfile`,{"fileid":file},{withCredentials: true})
        .then((response)=>{
        
            const filecf=response.data;
            
                    
        try {
            var binary = atob(filecf.data);

        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        var file1 = new Blob([new Uint8Array(array)], {type: filecf.mimetype});
  
        const url = window.URL.createObjectURL(file1);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
        'download',
        `${filecf.name}`,
      );
  
      document.body.appendChild(link);
  
      link.click();
  
      link.parentNode.removeChild(link);
        } catch (error) {
            
        }

        })
        .catch()

            
        } catch (error) {
            
        }
        

        
    }
    

    const [fileup, setFileup] = useState(new File(["No Attachments (i.e no file is attached) with this Assignment !"], "None.txt", {type: "text/plain"}));
    const save=(e)=>{
        setFileup(e.target.files[0]);
      }



      const [message,setmessage]=useState('')

      const [DISPLAY,setdisplay]=useState('none')
      
      const [CLASS,setclass]=useState('alert-danger')
    
    
      
    
      const [valueup,setvalueup]=useState('');

    const [open, setOpen] = useState(false);
  
 
    const changedt=(event)=>{
        setvalueup(event.target.value)
      }
  

  


    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setvalueup("");
        setdisplay("none");
        setOpen(false);
      };


      const senduploaddata = async (e) => {
        const formData = new FormData();
        formData.append("file", fileup);
        formData.append("assignno",uniqueNo);
        formData.append("announce",valueup);
        formData.append("classname",header);
        

        try {
          const res = await axios.post(
            `${process.env.REACT_APP_PREURL}/uploadstu`
            ,
            formData,{withCredentials:true}
          );
    
            setmessage('Assignment successfully Uploaded !')
            setclass('alert-success')
            setdisplay('block')

            setTimeout( function() { handleClose(); }, 1000);
    
        } catch (ex) {
          setmessage('Failed Uploading Assignment !-- Try Again')
          setclass('alert-danger')
          setdisplay('block')
        }
      };

      const uploaddata=()=>{


        if(valueup===''){
            setdisplay('block')
            setclass('alert-danger')
            setmessage('Note is Empty !')
          }
          else if(valueup.length > 1000){
            setdisplay('block')
            setclass('alert-danger')
            setmessage('Note word limit exceeded (max 1000 characters) !')
          }
          else if(fileup===undefined){
            setdisplay('block')
            setclass('alert-danger')
            setmessage('Choose a file !')
         
          }
          else if(fileup.size>5000000){
            setdisplay('block')
            setclass('alert-danger')
            setmessage('File size of max 5mb can be uploaded !')
         
          }
          else{
            setdisplay('none')
            senduploaddata();
          }
        
      }








    return (
        <>
            
            
            <div className='justify-content-center' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'40px',fontWeight:'bold'}}>

               <div style={{width:'100%',boxShadow:'rgba(0, 0, 0, 0.24) 1px 1px 1px',borderRadius:'6px'}}>
              
                <TextField
                    id="outlined-multiline-static"
                    label={`Class : ${header}`}
                    multiline
            
                    
                    defaultValue={title}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    style={{width:"100%",marginBottom:'3px'}}
                    
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label={`Announcement:`}
                    multiline
            
                    
                    defaultValue={value}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    style={{width:"100%",marginBottom:'3px'}}
                    
                    />
                <p style={{padding:'2px',fontFamily:'Roboto'}}><span style={{color:'green'}}>Due :</span> {datemod}</p>
                
                <div className="d-flex align-items-center mx-auto">

                <span className="mx-auto"><Button><DownloadIcon  fontSize="large" onClick={downloaddata} style={{cursor:'pointer',color:'black'}}/></Button></span>
                <span className="mx-auto" ><Button><CloudUploadOutlined fontSize="large" onClick={handleClickOpen} style={{cursor:'pointer',color:'black'}}/></Button></span>

                </div>

                </div>

            </div>
            



            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >


        <DialogContent>
          <DialogContentText>
          <span className="fw-bold mx-auto">Upload your Assignment !</span>
          <br/>

 <p className={`alert ${CLASS}`} style={{display:DISPLAY}} role="alert" id="alert_box">{message}</p>
    
    <input style={{margin:'0px'}}
        accept="*"
        
        id="contained-button-file"
        type="file"
        onChange={save}
      />

          </DialogContentText>
 

          <TextField
          id="outlined-multiline-static"
          label="Note"
          multiline

          
         inputProps={{"value":valueup}}

          InputLabelProps={{ shrink: true }} 

          variant="standard"
          style={{width:"100%",marginBottom:'5px'}}


          onChange={changedt}
        />


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button color="primary">
            <Button color="primary" onClick={uploaddata}>
              Upload
            </Button>
          </Button>
        </DialogActions>
      </Dialog>


        </>
    )
}

export default Assignmentlist
