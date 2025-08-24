import React from 'react'


import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';


import { AssessmentOutlined } from '@material-ui/icons';


import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';



import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';

import DuoOutlinedIcon from '@material-ui/icons/DuoOutlined';
import AppsOutlined from '@material-ui/icons/AppsOutlined';

import PersonAddIcon from '@material-ui/icons/PersonAdd';



import GradingIcon from "@material-ui/icons/GraphicEqRounded"

import { NavLink } from 'react-router-dom'



const Sidebar=()=>{


    return(
        <>
    
    
            <main id='mySidepanel'>

            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "278px"}}>
                
            <div  >

                <NavLink activeclassname="active" to="/clihome" replace className="d-flex align-items-center mb-1 mb-md-0 me-md-auto link-dark text-decoration-none" >
                
                <AppsOutlined fontSize='large' />

                <span className="mx-1 fs-4" style={{fontFamily:"Hina Mincho, serif"}}>&nbsp; A p p ' s  &nbsp;</span>
                

                </NavLink>
            </div>
                

                

                <hr/>
                <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink activeclassname="active" to="/clihome" replace className="nav-link link-dark">
                   

                    <HomeOutlinedIcon />

                    &nbsp; Home
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink activeclassname="active" to="/cliclasses" replace className="nav-link link-dark">
                   

                    <PersonAddIcon />

                    &nbsp; Add Class
                    </NavLink>
                </li>


                <li>
                    <NavLink activeclassname="active" to="/cliassignmentlist" replace className="nav-link link-dark">
                   
                    <AssignmentOutlinedIcon />
                    &nbsp; Assignment
                    </NavLink>
                </li>

                <li>
                    <NavLink activeclassname="active" to="/cliassignment" replace className="nav-link link-dark">
                   
                    <AssessmentOutlined />
                    &nbsp; Upload Assignment
                    </NavLink>
                </li>
 

                <li>
                <NavLink activeclassname="active" to="/cligrading" replace className="nav-link link-dark">
                   
                   <GradingIcon />
                   &nbsp; Evaluate Assignment
                   </NavLink>
               </li>

                <li>
                    <NavLink activeclassname="active" to="/clicalendar" replace className="nav-link link-dark">
                 
                    
                    <CalendarTodayOutlinedIcon/>
                    &nbsp; Calendar
                    </NavLink>
                </li>
                <li>
                    <NavLink activeclassname="active" to="/cliconference" replace className="nav-link link-dark">
                   
                    
                    <DuoOutlinedIcon/>
                    &nbsp; Video Conferencing
                    </NavLink>
                </li>

                </ul>
                

            </div>


            </main>

        

        </>
    )
}

export default Sidebar