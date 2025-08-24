const mongoose=require('mongoose');
const Insfile=require("../models/Insfile.js");
const Stufile=require("../models/Stufile.js");

const ObjectIdset =mongoose.Types.ObjectId;


const AssignmentSchema=new mongoose.Schema({
    classname:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    upload:[{
        announce:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        file:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        due:{
            type:Date,
            required:true
        },
        Date:{
            type:Date,
            default:Date.now
        },
        submission:[{
            username:{
                type:String,
                required:true
            },
            Date:{
                type:Date,
                default:Date.now 
            },
            announce:{
                type:String,
                required:true 
            },
            file:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
            },
        }]
        
    }]          
});



AssignmentSchema.methods.setdata=async function(body,files){
    try {

        //console.log(body)
        //console.log(files)

        const fileobj=new Insfile({"file":files.file});
        const objdata=await fileobj.save()

        //console.log(objdata)

        const names_for={"file":objdata._id,"announce":body.announce,"due":body.due,"title":body.title}
        
        //console.log(names_for)
        this.upload=this.upload.concat(names_for);


    } catch (error) {
        console.log(error)
        res.status(500).send('Assignment Uploading Failed !-- Try Again');

    }
}



AssignmentSchema.methods.setstudata=async function(body,files){
    try {

        //console.log(body)
        //console.log(files)

        const fileobj=new Stufile({"file":files.file,"announce":body.announce});
        const objdata=await fileobj.save()

        //console.log(objdata)

        const names_fo={"file":objdata._id,"announce":body.announce,"username":body.username}
        
        //console.log(names_fo)

        const elemobj=body.assignno;

        this.upload.map((elem,index)=>{
    
            if(elemobj==elem._id){
                //console.log(index)

                this.upload[index].submission=this.upload[index].submission.concat(names_fo);

            }
        })



    } catch (error) {
        console.log(error)
        res.status(500).send('Assignment Uploading Failed !-- Try Again');

    }
}



const Assignment=new mongoose.model('Assignment',AssignmentSchema);

module.exports=Assignment;