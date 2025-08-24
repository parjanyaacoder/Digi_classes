import * as React from 'react';

import { Box } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { useState } from 'react';
import axios from "axios";
import { useEffect } from 'react';


export default function BasicSelect() {
  const [age, setAge] = useState('');

  const [array,setarray]=useState([]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getallclassname=()=>{
    axios.get(`${process.env.REACT_APP_PREURL}/getallclassname`,{withCredentials: true})
    .then((response)=>{
      setarray(response.data) 
      
    })
    .catch(error=>{
    setarray([])
    })
  }


  useEffect(() => {
 getallclassname()
  }, [])

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
