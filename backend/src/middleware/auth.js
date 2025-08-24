const jwt=require("jsonwebtoken");
const Register=require("../models/register.js");
const Class=require("../models/class.js");




const auth=async (req,res,next)=>{
    // console.log("iam here in auth");
    //console.log('logout button is pressed')
    try{

        const token=req.cookies.jwt;
        const verifyUser=await jwt.verify(token,process.env.SECRET_KEY);

        //console.log(verifyUser);
       
        const user=await Register.findById(verifyUser._id);
        //console.log(user.email);

        


        if( req.url==="/addclass/" || req.url==="/addclass"){
            // console.log("iam here in add class authentication")

            
                try {
                    req.body.username= await user.username;
                    
                } catch (error) {
                 
                }   

        }

        //console.log(req.url)

        if(req.url==="/getdate/" || req.url==="/getdate" || req.url==="/getassigndata" || req.url==="/getassigndata/" || req.url==="/getclassdata/" || req.url==="/getclassdata" || req.url==="/getallclassname/" || req.url==="/getallclassname"  ){
            try {
                const username=await user.username;
                req.body={"username":username}
            } catch (error) {

                //console.log(error)
                res.send('error')
            }   
        }

        

        if( req.url==="/dateupload/" || req.url==="/dateupload" || req.url==="/getstuassigndata/" || req.url==="/getstuassigndata" || req.url==="/uploadstu/" || req.url==="/uploadstu" || req.url==="/upload/" || req.url==="/upload" || req.url==="/delete/" || req.url==="/delete" || req.url==="/downloadfile/" || req.url==="/downloadfile" || req.url==="/studownloadfile/" || req.url==="/studownloadfile"){
            
            try {
                const username=await user.username;
                
                //const filename=req.files.file.name
                req.body={...req.body,"username":username}
            } catch (error) {
                res.send('error')
            }   
        }


        if(req.url==="/logout" || req.url==="/logout/"){
            
            user.tokens=user.tokens.filter((currElement,i)=>{
             
                return currElement.token!==req.cookies.jwt;
            });

            // console.log(user.tokens);
            // console.log(user.tokens.length);
            
            //logout from all user

            //user.tokens=[];
            
            await user.save();
            res.clearCookie("jwt");

          
            res.status(200).send("Logout SuccessFull");
            // res.render("login");

        }else{
            next();
        }
        
        
    }catch(err){
        res.status(401).send("there is error please try again! ");
        //console.log(err);
    }
}

module.exports=auth;

