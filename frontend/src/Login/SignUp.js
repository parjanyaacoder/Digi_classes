import React from 'react'
import { useState } from 'react'
import './test.css'
import img1 from './images/img1.jpg'
import axios from 'axios'


const SignUp=(props)=>{

  // console.log("i am in signup")

    const [names,setname]=useState({username:'',email:'',password:'',confirm_password:''})
    const [message,setmessage]=useState('')

    const [DISPLAY,setdisplay]=useState('none')
    
    const [CLASS,setclass]=useState('alert-danger')

    

    const componentDidMount=()=>{
      
      axios.post(`${process.env.REACT_APP_PREURL}/register`,names,{withCredentials: true})
          .then((response) =>{
            setmessage(response.data)


            setdisplay('block')

            setclass('alert-success')

          } )
          .catch(error => {

            if(error.response){
              setmessage(error.response.data);  
            }

            else{
              setmessage('Registration Failed !-- Try Again');
         
            }

            setclass('alert-danger')
            setdisplay('block')
              console.error('Registration Failed !-- Try Again', error);

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
      // console.log("here in redirect")
      props.history.push('clilogin');
    }


 return(
    <>

      <section className="vh-100">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-12 col-xl-11">
                <div className="card text-black" style={{borderRadius: "25px"}}>
                  <div className="card-body p-md-1">
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                       <p className="text-center h1 fw-bold mb-2 mx-1 mx-md-4 mt-1" style={{fontFamily:"Hina Mincho, serif"}}>&nbsp; C l a s s  &nbsp;  R o o m</p>


                        <p className="text-center h2 fw-bold mb-2 mx-1 mx-md-4 mt-1" style={{fontFamily: "Nunito",fontWeight:"bold",color:'deepskyblue'}}>Sign Up</p>

                        <form onSubmit={onSubmits} className="mx-1 mx-md-4">

                          <div className="d-flex flex-row align-items-center mb-2">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="username" style={{fontFamily: "Nunito",fontWeight:"bold"}}>Your Username<span style={{color:'red'}}> *</span></label>
                             <input pattern="[a-z]+" title="Only lowercase letter's without space are allowed" onChange={inputEvent} value={names.username} name="username" type="text" id="username" className="form-control"  placeholder="username" required/>



                             
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-2">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="email" style={{fontFamily: "Nunito",fontWeight:"bold"}}>Your Email<span style={{color:'red'}}> *</span></label>
                              <input onChange={inputEvent} value={names.email}  id="email" type="email" name="email" aria-describedby="emailHelp" className="form-control" placeholder="email" required/>
                              
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-2">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="password" style={{fontFamily: "Nunito",fontWeight:"bold"}}>Password<span style={{color:'red'}}> *</span></label>
                              <input onChange={inputEvent} value={names.password} type="password" id="password" name="password" className="form-control" placeholder="password" required/>
                              
                            </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                            <div className="form-outline flex-fill mb-0">
                            <label className="form-label" htmlFor="confirm_password" style={{fontFamily: "Nunito",fontWeight:"bold"}}>Confirm password<span style={{color:'red'}}> *</span></label>
                              <input onChange={inputEvent} value={names.confirm_password} type="password" id="confirm_password" name="confirm_password" className="form-control" placeholder="confirm password" required/>
                              
                            </div>
                          </div>

                    

                          <div className="d-flex justify-content-center mx-4 mt-2  mb-lg-2">
                            <button type="submit" id="register" className="btn btn-outline-primary btn-lg mx-auto">Register</button>
                            <button onClick={change_page} className="btn btn-outline-success btn-lg mx-auto">Sign In</button>
                            
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

// const SignUp=()=>{
//   console.log("here 1")
//   return (<><h1>hey hey boi</h1></>);
  
// }

export default SignUp