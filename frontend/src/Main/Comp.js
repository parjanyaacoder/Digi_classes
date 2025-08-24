import React, { Component } from 'react'


import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './css/bootstrap.min.css'
import './css/main/sidebars.css'


import Home from "../Home/ClassProfile";

import Assignment from "../Assignment/Assignment";

import Calendarmod from "../Class/Class";

import AssignmentLayout from '../Assignment/AssignmentLayout'


import JoinRoom from '../Conference/JoinRoom'
import Room from '../Conference/Room'


import NewClasses from '../NewClasses/NewClasses'
import GradingLayout from '../Assignment/Grading.js'


import SignUp from "../Login/SignUp";
import SignIn from "../Login/SignIn";

import Notfound from "../Notfound/Notfound" ;

import { useNavigate } from 'react-router';
import { useLocation } from 'react-router'

import { useParams } from 'react-router'


function r(pagedata){

    const props={"history":{"push":pagedata.navigate,"location":pagedata.location}}

    // console.log(props)

var page=pagedata.page;
// console.log(page)
    if(page==='home'){
        // console.log("here in comp home page")
        // console.log(this.props);
        return <Home />
    }   
    else if(page==='assignment'){
        return <Assignment />
    }
    
    else if(page==='calendar'){
        return <Calendarmod />
    }
    else if(page==='assignmentlist'){
        return  <AssignmentLayout />
    }
    else if(page==='conference'){
        return  <JoinRoom {...pagedata} />
    }
    else if(page==='joinconference'){
        // console.log(pagedata)

        return  <Room {...pagedata} />
    }
    else if(page==='classes'){
        return <NewClasses />
    }
    else if(page==='grading'){
        return <GradingLayout />
    }
    // else{
    //     return <Home />
    // }
    else if(page==='signin'){
        return <SignIn {...props}/>
    }
    else if(page==='signup'){
        // console.log("comp in a signup")
        return <SignUp {...props}/>
    }
    else if(page==='notfound'){
        console.log("page not found")
        return <Notfound {...props}/>
    }

}

// class Comp extends  Component {

const Comp=(props)=>{


    
    

    // render() {
        
    

// console.log(this.props);    

        
        const navigate=useNavigate();
        const location=useLocation();
        const {roomID}=useParams();
        // console.log(roomID);
        const params={"roomID":roomID}
        

        return(
            <>

                <div className='contentgetter'>
                <div id="mySidebar" className="sidebar">
                
                
                <Sidebar />
    
                </div>
    
                <div id="main">
    
        
                        <Navbar />
                       
                    { 
                    
                    r({...props,navigate,location,params})
                       
                    } 
                        
                        
                        
                </div> 
    
               
                </div>
            </>
        )


    // } 
                }


export default Comp