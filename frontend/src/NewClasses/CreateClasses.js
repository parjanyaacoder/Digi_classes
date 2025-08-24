import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import GradientIcon from '@material-ui/icons/Gradient';


import { useState } from 'react';
import axios from 'axios';
export default function FormDialog(props) {

    
  const [open, setOpen] = React.useState(false);

 const [inputvalue,setinput]=React.useState('');

 const [copystate,copyupdate]=useState('')
 const [color,setcolor]=useState('danger')

 const clearcopy=()=>{
    copyupdate('')
}


    const updateinput=(event)=>{
        setinput(event.target.value)
    }


    const getvalue=()=>{

      const temp=inputvalue;
      if(temp===''){
        setcolor('danger')
        copyupdate('Name cannot be empty !')

        }
      else{

        const classlink=`https://source.unsplash.com/600x300/?science,${temp}`
          const names={"classname":temp,"classimage":classlink,"create":true}

          axios.post(`${process.env.REACT_APP_PREURL}/addclass`,names,{withCredentials:true})
          .then((result) => {

            if(result.status===208){
              setcolor(`danger`)
              copyupdate(result.data)
            }
            else if(result.status===201){
              setcolor('success')
            copyupdate(`Successfully created Class Room with name: ${temp}`)
            }
        
            
          }).catch((err) => {
            setcolor('danger')
            console.log(err)

            copyupdate('Class Room not created --Try again !')
          });


      }
      
    }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setinput('');
      clearcopy();
    setOpen(false);
  };


  return (
    <div>
        <div className="alert alert-secondary mt-0 m-2" role="alert">
        * Create &nbsp;the &nbsp;Class Room&nbsp; by&nbsp; Clicking &nbsp;on &nbsp;the &nbsp;Button&nbsp; Below

        <br />
        </div>
    
    <div className="alert m-3 d-flex justify-content-center" role="alert" >
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
             &nbsp; Create &nbsp; &nbsp; Class Room &nbsp; &nbsp;
            <GradientIcon fontSize="large"/>
        </Button>
    </div>

    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Class Room</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Create Class Room by providing the unique Name for the Class Room Below. <br /> <span className={`text-${color}`} >{copystate}</span>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            value={inputvalue}
            onChange={updateinput}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button  color="primary">

            <Button color='primary' onClick={getvalue}>
            Create
            </Button>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
