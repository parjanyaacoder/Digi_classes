const { compareSync } = require('bcrypt');
const mongoose=require('mongoose');
const jwt=require("jsonwebtoken");


const ClassSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

    },
    classowned:[{
        classname:{
            type:String,
            required:true,
            //unique:true
        },
        classimage:{
            type:String,
            required:true,
        },
        Date:{
            type:Date,
            default:Date.now
        }
    }],
    classjoined:[{
        classname:{
            type:String,
            required:true,
            //unique:true
        },
        Date:{
            type:Date,
            default:Date.now
        }
    }]
          
});



ClassSchema.methods.setdata=async function(varclassname,varclassimage,var3){
    try {

        
        if(var3===true){
            this.classowned=this.classowned.concat({"classname":varclassname,"classimage":varclassimage});
        }
        else if(var3===false){
            //console.log('iam here')
            this.classjoined=this.classjoined.concat({"classname":varclassname});
         }

        

    } catch (error) {
        console.log(error)
        res.status(500).send('Class Room not created !-- Try Again');

    }
}


ClassSchema.methods.deldata=async function(classname){
    try { 
        //console.log(classname)
        this.classjoined=this.classjoined.filter((elem,index)=>{
            if(elem.classname===classname){
                return false
            }else{
                return true
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('Class Room not created !-- Try Again');

    }
}


const Class=new mongoose.model('Class',ClassSchema);

module.exports=Class;