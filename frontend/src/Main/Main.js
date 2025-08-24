import axios from 'axios'
import { useLocation } from 'react-router';

async function Main(props) {

  // const navigate=useNavigate();

  // const location=useLocation();
  
  //  console.log(location)

    const checking_session= async ()=>{

      

      //return true
        const result=await axios.get(`${process.env.REACT_APP_PREURL}/secret`,{withCredentials: true})
        // console.log(process.env.REACT_APP_PREURL)
        .then((response) =>{

          // console.log("here in a main for redirecting to clihome")
          if(props.history.location.pathname==='/clilogin'){
            props.history.push('/clihome')
          }

          return true

        } )
        .catch(error => {
          // console.log("error while calling")
          // console.log(props);   

          if(props.history.location.pathname==='/clisignup'){
            return false;
          }

          if(error.response){

            // historyy.push('/clilogin')
            // console.log(props)
            
            props.history.push('/clilogin')
            // navigate('/clilogin');
            

            return false 
          }

          else{
            // const {historyy } = this.props

            // historyy.push('/clilogin')

            props.history.push('/clilogin')
            return false
          }

    
             });

             return await result            
}

    const data=await checking_session()
    return data

    
}

export default Main
