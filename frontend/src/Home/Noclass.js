import React from 'react'

const Noclass=(props)=> {
    return (
        <>               
        <div className="justify-content-center">
            <p className="text-center h3 fw-bold" style={{fontFamily: "Nunito",fontWeight:"bold",color:'deepskyblue'}}>{props.data}</p>
        </div>
        </>     
    )
}

export default Noclass
