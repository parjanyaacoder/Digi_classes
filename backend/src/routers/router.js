// const { json } = require('express');
const express=require('express');
const app=express();
const router=express.Router();
const path=require("path");

const Link=require("../models/Link.js");
const Register=require('../models/register.js');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const auth=require("../middleware/auth.js");

const Class=require('../models/class.js')

const getallclassname=require("../functions/getallclassname.js")

const getdata=require("../functions/getclassdata.js")

const getassigndata=require("../functions/getassigndata.js")

const getdatedata=require("../functions/getdatedata.js")

const getstuassign=require("../functions/getstuassign.js")

const Assignment=require("../models/Assignment.js")

const getfiledata=require("../functions/getfiledata.js")
const stugetfiledata=require("../functions/stugetfiledata.js")
//const cookieParser=require("cookie-parser");

// router.get("/",(req,res)=>{
    
//     res.render("index");
// });

// router.get("/",(req,res)=>{
//     res.send('server is running');
// })

router.get("/secret",auth,(req,res)=>{
    //console.log(req.cookies.jwt);
    res.status(201).send("secret");    
})


router.get("/logout",auth,(req,res)=>{
    try{
        console.log("logout successFull");
        res.status(200).send("Logout SuccessFull");
    }catch(err){
        res.status(400).send("There is a error Try Again");
    }
})

// router.get("/login",(req,res)=>{
//     res.render("login");
// });

// router.get("/register",(req,res)=>{
//     res.render("register");
// });

router.post("/register",async (req,res)=>{
    // console.log("iam in register")
    
    try{       
            //    res.header("Access-Control-Allow-Origin", "OPTIONS,PUT,GET,POST");

        // console.log("i am here in register")
      if(req.body.password!==req.body.confirm_password){
          res.status(400).send('Password Does not match with Confirm password  !');
      }else if(!req.body.email){

        res.status(400).send('Please enter the Email Id');
      }else{
       
            try{
                //console.log(req.body);
                delete req.body.confirm_password;

                const names={"username":req.body.username}

                const saving_classes=new Class(names);

                const saving= new Register(req.body);
                try{
                    const token=await saving.generateAuthToken();
                    const result=await saving.save();
                    
                    const result_classes=saving_classes.save();

                    res.cookie("jwt",token,{
                        expires:new Date(Date.now() + 3000000000),
                        httpOnly:true
                    });

                    res.status(201).send("Registered Successfully !-- Now you can SignIn");

                   
        
                }catch(e){
                        console.log(e);
                        res.status(500).send('Already registered (same username or email) !-- Try Again');
            
                    }
                
            }catch(e){
                console.log(e);
                res.status(500).send('Registration Failed !-- Try Again');
            }
      }
    }catch(err){
        console.log(err);
        res.status(500).send('Registration Failed !-- Try Again');
    }
});



router.post("/addclass",auth,async (req,res)=>{
    //console.log('iam in add class')

    //console.log(req.body)

    try{

        if(req.body.create===true){
                 //const saving= new Class(req.body);
        
        try{

            const checkdata1=await Class.findOne({"classowned.classname":req.body.classname})
            
            if(checkdata1===null){
                const objdata=await Class.findOne({"username":req.body.username})
            const setdatavar=await objdata.setdata(req.body.classname,req.body.classimage,req.body.create);
            const result=await objdata.save();
            
            const names_assign={"classname":req.body.classname,"username":req.body.username}

            const saving_assign=new Assignment(names_assign);
            const saving_link=new Link(names_assign);
            
            const result_assign=await saving_assign.save()
            const result_link=await saving_link.save()

            res.status(201).send("Class Room Registered Successfully !");
            }
            else{
                res.status(208).send("This Class room name is already registered !-- Try another one")

            }

            
        
            
        }catch(e){
                console.log(e);
                res.status(500).send('Class Room not created !-- Try Again');
    
            }

        }
        else if(req.body.create===false){

        
        try{
            const checkdata1=await Class.findOne({"classowned.classname":req.body.classname})
            const checkdata2=await Class.findOne({"username":req.body.username,"classjoined.classname":req.body.classname})


            const objdata=await Class.findOne({"username":req.body.username}) 
            
            //console.log(checkdata1)

            if(checkdata1===null){
                res.status(208).send("Class Room with this name does not exist !")
            }
            else if(checkdata2!==null){
                res.status(208).send("Class Room with this name Already registered !")

            }
            else if(checkdata1!==null && checkdata2===null){
                const setdatavar=await objdata.setdata(req.body.classname,req.body.classimage,req.body.create);
                const result=await objdata.save();
                res.status(201).send("Class Room Registered Successfully !");
            }
            
            else{
                res.status(208).send("Class Room with this name does not exist !")
            }
            
        }catch(e){
                console.log(e);
                res.status(500).send('Enter Details correctly !-- Try Again');
    
            }


        }
        
   
        
        
    }catch(e){
        console.log(e);
        res.status(500).send('Class Room Registration Failed !-- Try Again');
    }

})


router.get("/getclassdata",auth,async(req,res)=>{
    try {
        //console.log(req.body)
        const data=await getdata(req.body.username);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send("error")
    }
})

router.get("/getassigndata",auth,async(req,res)=>{
    try {
        //console.log(req.body)
        const data=await getassigndata(req.body.username);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send("error")
    }
})


router.post("/getstuassigndata",auth,async(req,res)=>{
    try {
        //console.log(req.body)
        const data=await getstuassign(req.body.username,req.body.classname);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send("error")
    }
})


router.post("/downloadfile",auth,async(req,res)=>{
    try {
        //console.log(req.body)
        if(req.body.fileid!==undefined){
            const data=await getfiledata(req.body);
            //console.log(data)
            res.status(201).json(data)
        }else{
            res.status(500).send("error")
        }
        
    } catch (error) {
        res.status(500).send("error")
    }
})



router.post("/studownloadfile",auth,async(req,res)=>{
    
    try {
        //console.log(req.body)
        if(req.body.fileid!==undefined){
            const data=await stugetfiledata(req.body);
            //console.log(data)
            res.status(201).json(data)
        }else{
            res.status(500).send("error")
        }
        
    } catch (error) {
        res.status(500).send("error")
    }
})

router.post("/upload",auth,async (req, res) => {
    
    //console.log(newpath)
    //console.log(file,filename)
    
    try {
        const file = req.files.file;
        const filename = file.name;

        //console.log(file.size)

        if(file.size>5000000){
            res.status(408).send('max file of 5mb is allowed !')
        }
        
        else{
            //now send data to database
            try {
                //console.log(req.body)

                const objdata=await Class.findOne({'username':req.body.username,"classowned.classname":req.body.classname});

                //console.log(objdata);

                if(objdata!==null){

                    //send data to database

                    const objdata2=await Assignment.findOne({'classname':req.body.classname})

                    //console.log(objdata2)
                    if(objdata2!==null){
                        const pre_assign_method=await objdata2.setdata(req.body,req.files);
                        const result_save_assign=await objdata2.save();
    
                        //console.log(pre_assign_method)
                        res.status(201).send('Assignment successfully Uploaded !');
    
                    }else{
                        res.status(500).send('Assignment Uploading Failed !-- Try Again')

                    }
                    
                }else{
                    res.status(500).send('Assignment Uploading Failed !-- Try Again')
                }
                
            } catch (error) {
                res.status(500).send('Assignment Uploading Failed !-- Try Again')
            }

        }
        
    } catch (error) {
        //console.log(error)
        res.status(500).send('Assignment Uploading Failed !-- Try Again');
    }
    

  });


  router.post("/uploadstu",auth,async (req, res) => {
    
    //console.log(newpath)
    //console.log(file,filename)
    
    try {
        const file = req.files.file;
        const filename = file.name;

        //console.log(file.size)

        if(file.size>5000000){
            res.status(408).send('max file of 5mb is allowed !')
        }
        
        else{
            //now send data to database
            try {
                //console.log(req.body)

                const objdata=await Class.findOne({'username':req.body.username,"classjoined.classname":req.body.classname});

                //console.log(objdata);

                if(objdata!==null){

                    //send data to database

                    const objdata2=await Assignment.findOne({'classname':req.body.classname})

                    //console.log(objdata2)
                    if(objdata2!==null){


                        

                        const pre_assign_method=await objdata2.setstudata(req.body,req.files);
                        const result_save_assign=await objdata2.save();
    
                        //console.log(pre_assign_method)
                        res.status(201).send('Assignment successfully Uploaded !');
    
                    }else{
                        res.status(500).send('Assignment Uploading Failed !-- Try Again')

                    }
                    
                }else{
                    res.status(500).send('Assignment Uploading Failed !-- Try Again')
                }
                
            } catch (error) {
                res.status(500).send('Assignment Uploading Failed !-- Try Again')
            }

        }
        
    } catch (error) {
        //console.log(error)
        res.status(500).send('Assignment Uploading Failed !-- Try Again');
    }
    

  });

router.post("/delete",auth,async (req,res)=>{
    try {
        //console.log(req.body)
        const objdata=await Class.findOne({"username":req.body.username,"classjoined.classname":req.body.classname});

        if(objdata!==null){

            const result1=await objdata.deldata(req.body.classname);
            const result2=await objdata.save();

            //console.log(result2)
            res.status(201).send('successfully removed the class');

        }else{
            res.status(500).send('cannot delete! --Try again')
        }
    } catch (error) {
       res.status(500).send('cannot delete! --Try again') 
    }
})

router.post("/dateupload",auth,async(req,res)=>{
    try {
        

        const objdata=await Link.findOne({"classname":req.body.classname,"username":req.body.username})
        //console.log(objdata)
        if(objdata!==null){
            
            const rs1=await objdata.setdata(req.body)
            const rs2=await objdata.save()
            
            if(rs2!==null){
                res.status(201).send('Successfully Uploaded');
            }else{
                res.status(500).send("error");
            }
        }else{
            res.status(500).send("error");
        }


    } catch (error) {
        res.status(500).send("error");
        
    }
})

router.get("/getdate",auth,async(req,res)=>{
    try {
        //console.log(req.body)
        const data=await getdatedata(req.body.username);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send("error")
    }
})

router.get("/getallclassname",auth,async(req,res)=>{
    try {
        console.log(req.body)
        const data=await getallclassname(req.body.username);
        res.status(201).json(data)
    } catch (error) {
        res.status(500).send("error")
    }
})

router.post("/login",async(req,res)=>{
    try{
        
        // const check=req.body.checkbox;
        // delete req.body.checkbox;

        try{
            check="on"   

        const objdata=await Register.findOne({username:req.body.username});
        //console.log(objdata);

        const flag=await bcrypt.compare(req.body.password,objdata.password);

        if(flag===true){

            //console.log('iam here');
            const token2=await objdata.generateAuthToken();
            const result=await objdata.save();

            //console.log(check);

            if(check==="on"){
                res.cookie("jwt",token2,{ sameSite: 'none', secure: true},{
                    expires:new Date(Date.now() + 3000000000),
                    httpOnly:true,
                    
                    //secure:true
                });
                //console.log('added cookie')
                //console.log(res.cookie.jwt)
            }

                
                res.status(200).send('Successfully SignedIn !')
            // res.status(200).render("index");
        }else{
            res.status(400).send('Username/Password Incorrect ! --Try Again');
        }
        
        }catch(e){
            res.status(400).send("Username/Password Incorrect ! --Try Again");
        }
        
    }catch(e){
        res.status(500).send("Signing In Failed ! --Try Again"); 
    }
})



// router.get("*",(req,res)=>{
//     res.status(404).send("Page Not Found !");
// })

// router.post("*",(req,res)=>{
//     res.status(404).send("Page Not Found !");
// })

// console.log(path.join(__dirname,'../','../client/build', 'index.html'))


module.exports=router;