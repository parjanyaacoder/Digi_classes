const mongoose=require('mongoose');

const LinkSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    classname:{
        type:String,
        required:true
    },
    data:[{
        link:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            required:true
        }
    }]
          
});



LinkSchema.methods.setdata=async function(body){
 

    try {
        const datefp=new Date(body.date) 
         this.data=this.data.concat({"link":body.link,"date":datefp});


    } catch (error) {
        console.log(error);
        res.status(500).send('error');

    }
}


const Link=new mongoose.model('Link',LinkSchema);

module.exports=Link;