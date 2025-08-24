import React from 'react'
import { useState } from 'react'
import './test.css'
import img1 from './images/img3.jpg'
import axios from 'axios'

import Main from '../Main/Main'

import { useEffect } from 'react'

const SignIn=(props)=>{

  // console.log("im in signin")

// console.log(props);

    const [names,setname]=useState({username:'',password:''})
    const [message,setmessage]=useState('')

    const [DISPLAY,setdisplay]=useState('none')
    
    const [CLASS,setclass]=useState('alert-danger')

    

    const componentDidMount=()=>{
      
      axios.post(`${process.env.REACT_APP_PREURL}/login`,names,{withCredentials: true})
          .then((response) =>{
            setmessage(response.data)


            setdisplay('block')

            setclass('alert-success')

            Main({...props});

          } )
          .catch(error => {

            if(error.response && error.response.status===400){
              console.log(error.response)
              setmessage(error.response.data);  
            }

            else{
              setmessage('Signing In Failed ! --Try Again');
         
            }

            setclass('alert-danger')
            setdisplay('block')

               });
  }



    const onSubmits=(event)=>{
        event.preventDefault();
        
        
       
        componentDidMount();

        

    }

    const inputEvent=(event)=>{

        setname((prev)=>{
            const name=event.target.getAttribute('name');
            const val=event.target.value;
            const newItem={...prev,[name]:val};
            
            return(newItem)
        })
        
    }

    const change_page=(e)=>{
      e.preventDefault();
      // console.log("here in a signin page");
      props.history.push('/clisignup');
      // console.log("here for 2nd time");
    }

  
    useEffect(() => { 

          // console.log("useefeect");
          // console.log(props)
            Main({...props})
      
            },[]);



 return(
    <>

      <section className="vh-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className=" col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius: "25px"}}>
                  <div className="card-body p-md-1">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                       <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-2" style={{fontFamily:"Hina Mincho, serif"}}>&nbsp; C l a s s  &nbsp;  R o o m</p>


                        <p className="text-center h2 fw-bold mb-4 mx-1 mx-md-4 mt-2" style={{fontFamily: "Nunito",fontWeight:"bold",color:'deepskyblue'}}>Sign In</p>

                        <form onSubmit={onSubmits} className=" mx-1 mx-md-4">

                          <div className="d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="username" style={{fontFamily: "Nunito",fontWeight:"bold"}}>Your Username<span style={{color:'red'}}> *</span></label>
                             <input pattern="[a-z]+" title="Only lowercase letter's without space are allowed" onChange={inputEvent} value={names.username} name="username" type="text" id="username" className="form-control"  placeholder="username" required/>



                             
                            </div>
                          </div>


                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="password" style={{fontFamily: "Nunito",fontWeight:"bold"}}>Password<span style={{color:'red'}}> *</span></label>
                              <input onChange={inputEvent} value={names.password} type="password" id="password" name="password" className="form-control" placeholder="password" required/>
                              
                            </div>
                          </div>

                          

                    

                          <div className="d-flex justify-content-center mx-4 mt-4  mb-lg-4">
                            <button type="submit" id="register" className="btn btn-outline-primary btn-lg mx-auto">Log In</button>
                            <button onClick={change_page} className="btn btn-outline-success btn-lg mx-auto">Sign Up</button>
                            
                          </div>
                          <p className={`alert ${CLASS}  mt-2`} style={{display:DISPLAY}} role="alert" id="alert_box">{message}</p>
                        </form>

                      </div>
                      <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        
                        <img style={{borderRadius:'6%'}} src={img1} className="img-fluid" alt="Sample" />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    </>
  )
}

export default SignIn