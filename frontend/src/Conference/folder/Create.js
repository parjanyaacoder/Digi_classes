import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

import { useState } from 'react';

import { v1 as uuid } from "uuid";


export default function CreateDialog(props) {

  


const [value,setvalue]=useState('')
const [copystate,copyupdate]=useState('')
const [color,setcolor]=useState('danger')

const generatelink=()=>{
    const id=uuid();
    setvalue(`https://${window.location.hostname}/clijoin/${id}`);
}


const updatedata=()=>{

  if(navigator.clipboard===undefined){
   copyupdate('copy it manually(security issue)') 
  }
  else{
    navigator.clipboard.writeText(value)
  .then((response) =>{copyupdate('COPIED !'); setcolor('success')})
  .catch(error => copyupdate('copy manually (security issue)'))    
    
  }
  
}

const clearcopy=()=>{
    copyupdate('')
}




  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {

    generatelink();

    setOpen(true);
  };

  const handleClose = () => {
    clearcopy();
    setOpen(false);
  };

  return (
    <div>
        <div className="alert alert-secondary mt-0 m-2" role="alert">
        * create &nbsp; a &nbsp; Conference &nbsp; link &nbsp; by &nbsp; Clicking &nbsp; on &nbsp; the &nbsp; button &nbsp; below

        <br />
        </div>
    
    <div className="alert m-3" role="alert" >
        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
             &nbsp; C R E A T E &nbsp; &nbsp; &nbsp; Conference &nbsp; &nbsp;
            <AddIcCallIcon fontSize="large"/>
        </Button>
    </div>

    
      <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Creating Conference</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Copy The Conference Link given Below and share it to makes them Join. &nbsp;&nbsp; <span className={`text-${color}`} >{copystate}</span>
          </DialogContentText>
          <TextField
            

          id="filled-read-only-input"
          label="Link"
          defaultValue={value}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
          fullWidth
        />
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={updatedata}>
            Copy
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
