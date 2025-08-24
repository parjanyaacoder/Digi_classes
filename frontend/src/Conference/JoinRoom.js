import './joinroom.scss'

import FormDialog from './folder/Join'
import CreateDialog from './folder/Create'




const JoinRoom=(props)=>{

    return(
        <>

<div className='justify-content-center' style={{display:'flex',flexWrap:'wrap'}}>

            <div  className='justify-content-center' style={{display:'flex',flexDirection:'row',fontFamily:'Roboto',color:'white',flexWrap:'wrap'}}>

            <div className="container px-5 m-0">
            <div className="row px-2">
            
                <div className="col p-3">
                
                <div className="gradient-border">
                    <CreateDialog {...props} />
                </div> 



                </div>
                
                <div className="col p-3">

                <div className="gradient-border">
                    

                    <FormDialog {...props} />


                </div> 


                </div>
            </div>
            </div>
            </div>
            
            </div> 
            


</>


    )
}



export default JoinRoom