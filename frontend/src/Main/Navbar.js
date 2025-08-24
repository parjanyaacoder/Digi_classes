import React from 'react'
import DehazeIcon from '@material-ui/icons/Dehaze'

import {Button} from '@material-ui/core'

import SchoolOutlinedIcon from '@material-ui/icons/SchoolOutlined';
import { useState } from 'react';

import Logout from './Logout';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

import Main from './Main';


import { useLocation } from 'react-router';

const Navbar=()=>{


    const [count,setcount]=useState(0);




    const openNav=()=>{
        
        setcount(()=>1);
        document.getElementById("mySidebar").style.width = "280px";
        
        
        document.getElementById("main").style.marginLeft = "280px";
        
    }

    const closeNav=()=>{
        setcount(()=>0);

        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
    }

    const Side=()=>{
        if(count===0){
            openNav();
        }
        else{
            closeNav();
        }
        
    }

    const history=useNavigate()

    const location=useLocation()
    const historyy={"push":history,"location":location}
    const props={history:historyy};
    
    // console.log(props);
    useEffect(() => { 

          Main({...props});
    
          },[]);


    return(
        <>




    <nav  className="navbar navbar-light bg-light border-left mb-4">
    <Button onClick={Side} variant='outlined' style={{marginLeft:"20px"}}> <span> <DehazeIcon fontSize="large" /></span> </Button> 
    
    
    <a href="/" className="navbar-brand" style={{marginLeft:'auto'}}>
    <SchoolOutlinedIcon className="mb-2" fontSize='large'/>

        
       
        <span  className="fs-4" style={{fontFamily:"Hina Mincho, serif"}}>&nbsp; C l a s s</span>
    
    </a>
    <span  className="fs-4" style={{marginBottom:'8px', fontFamily:"Hina Mincho, serif"}}>&nbsp;R o o m</span>
    <Logout />
    </nav>
        </>
    )
}

export default Navbar


