import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';

import { NavLink } from 'react-router-dom';


export default function FormDialog(props) {

   
  const [open, setOpen] = React.useState(false);

    const [inputvalue,setinput]=React.useState('');


    const updateinput=(event)=>{
        setinput(event.target.value)
    }

    // const getvalue=()=>{
    //   const temp=inputvalue;
    //   window.open(temp,'_blank'); 

      
    //   const temp2=window.location.origin;
    //   let result = temp.replace(temp2, "");
    //   // return `${result}`

    //   return `/cliconference`

    // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setinput('')
    setOpen(false);
  };



  





  return (
    <div>
        <div className="alert alert-secondary mt-0 m-2" role="alert">
        * Join &nbsp; a &nbsp;Conference&nbsp; by&nbsp; Clicking &nbsp;on &nbsp;the &nbsp;Button&nbsp; Below

        <br />
        </div>
    
    <div className="alert m-3" role="alert" >
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
             &nbsp; J o i n  &nbsp; &nbsp; &nbsp; Conference &nbsp; &nbsp;
            <AddIcCallIcon fontSize="large"/>
        </Button>
    </div>

    
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Join Conference</DialogTitle>
        <DialogContent>
          <DialogContentText>
           To Join a Conference you must provide the Link for The Conference Below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Link"
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

            {/* <NavLink to={getvalue} replace >
            JOIN
            </NavLink> */}

            <a href={`${inputvalue}`} target="_blank" rel="noopener noreferrer" >JOIN</a>


          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
