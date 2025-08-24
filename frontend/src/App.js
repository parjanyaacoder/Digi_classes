import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

import { useNavigate } from "react-router-dom";
import Comp from "./Main/Comp";


// import SignUp from "./Login/SignUp";
// import SignIn from "./Login/SignIn";

// import Notfound from "./Notfound/Notfound" ;
const App=()=> {

  console.log(process.env.REACT_APP_PREURL)
  // console.log(process.env.NODE_ENV)

  // const history=useNavigate()
  // const historyy={"push":history}
  // const props={history:historyy};


  return (
    <div className="App">
        
        
          
        <BrowserRouter>




        <Routes>


         <Route exact path="/" Component={()=>(<Comp page="home"/>)}/>
           
         <Route  path="/clihome" Component={()=>(<Comp page="home"/>)}/>

         <Route  path="/cliclasses" Component={()=>(<Comp page="classes"/>)}/>


           <Route  path="/cliassignment" Component={()=>(<Comp page="assignment"/>)}/>



           <Route  path="/clicalendar" Component={()=>(<Comp page="calendar"/>)}/>
           <Route  path="/cligrading" Component={()=>(<Comp page="grading"/>)}/>

           <Route  path="/cliassignmentlist" Component={()=>(<Comp page="assignmentlist"/>)}/>

           <Route  path="/cliconference" Component={()=>(<Comp page="conference"/>)}/>

           {/* <Route  path="/clijoin/:roomID" Component={(match)=>(<Comp katch={match} page="joinconference"  />)}/>  */}


           <Route  path="/clijoin/:roomID" Component={()=>(<Comp katch="temp katch" page="joinconference"  />)}/> 

            {/* <Route path="/clisignup" Component={()=>(<SignUp/>)} />
            <Route path="/clilogin" Component={()=><SignIn/>} />

            <Route path="*" Component={()=><Notfound/>}/> */}

            <Route path="/clisignup" Component={()=>(<Comp page="signup"/>)} />
            <Route path="/clilogin" Component={()=><Comp page="signin"/>} />

            <Route path="*" Component={()=><Comp page="notfound"/>}/>
           



            {/* <Route exact path="/" Component={()=>(<Comp page="home"/>)}/>
           
           <Route  path="/clihome" element={<Comp page="home"/>}/>
  
           <Route  path="/cliclasses" element={<Comp page="classes"/>}/>
  
  
             <Route  path="/cliassignment" element={<Comp page="assignment"/>}/>
  
  
  
             <Route  path="/clicalendar" element={<Comp page="calendar"/>}/>
             <Route  path="/cligrading" element={<Comp page="grading"/>}/>
  
             <Route  path="/cliassignmentlist" element={<Comp page="assignmentlist"/>}/>
  
             <Route  path="/cliconference" element={<Comp page="conference"/>}/>
  
             {/* <Route  path="/clijoin/:roomID" element={<Comp katch={match} page="joinconference"  />}/>
  
              <Route path="/clisignup" element={SignUp} />
              <Route path="/clilogin" element={SignIn} />
  
              <Route element={<Notfound/>}/>

              */}

         </Routes>
        </BrowserRouter>
          
        
        

        
    </div>
  )
}

export default App;
