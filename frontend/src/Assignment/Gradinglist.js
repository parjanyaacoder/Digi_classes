import React from 'react'
import TextField from '@material-ui/core/TextField';
import DownloadIcon from "@material-ui/icons/CloudDownloadOutlined";
import {decode as atob, encode as btoa} from 'base-64';
import { Button } from '@material-ui/core';
import axios from "axios";


const Assignmentlist=( props )=> {
    

    const { Class1 }=props
    const {dateuploaded,file,title,username,value}=Class1

    const d=new Date(dateuploaded);
    const datemod=d.toDateString();
    
    const downloaddata=()=>{


        try {
            axios.post(`${process.env.REACT_APP_PREURL}/studownloadfile`,{"fileid":file,"announce":value},{withCredentials: true})
        .then((response)=>{
        
            const filecf=response.data;
            
                    
        try {
            var binary = atob(filecf.data);

        var array = [];
        for (var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        var file1 = new Blob([new Uint8Array(array)], {type: filecf.mimetype});

        const url = window.URL.createObjectURL(file1);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
        'download',
        `${filecf.name}`,
      );
  
      document.body.appendChild(link);
  
      link.click();
  
      link.parentNode.removeChild(link);
        } catch (error) {
            
        }

        })
        .catch(err=>{
            console.log(err)
        })

            
        } catch (error) {
            
        }
        

        
    }
    

    return (
        <>
            
            
            <div className='justify-content-center' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:'40px',fontWeight:'bold'}}>

               <div style={{width:'100%',boxShadow:'rgba(0, 0, 0, 0.24) 1px 1px 1px',borderRadius:'6px'}}>
              
                <TextField
                    id="outlined-multiline-static"
                    label={`Student name: ${username}`}
                    multiline
            
                    
                    defaultValue={title}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    style={{width:"100%",marginBottom:'3px'}}
                    
                    />
                    <TextField
                    id="outlined-multiline-static"
                    label={`Note:`}
                    multiline
            
                    
                    defaultValue={value}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"
                    style={{width:"100%",marginBottom:'3px'}}
                    
                    />
                <span className="text-center"><p style={{padding:'2px',fontFamily:'Roboto'}}><span style={{color:'green'}}>Submitted On :</span> {datemod}</p></span>
                
                <div className="d-flex align-items-center mx-auto">

                <span className="mx-auto"><Button><DownloadIcon  fontSize="large" onClick={downloaddata} style={{cursor:'pointer',color:'black'}}/></Button></span>

                </div>

                </div>

            </div>

        </>
    )
}

export default Assignmentlist
