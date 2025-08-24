const mongoose=require('mongoose');

const StufileSchema=new mongoose.Schema({

announce:{
    type:String,
    required:true
},
 file:{
        type:Object,
        required:true
    }   
});

const Stufile=new mongoose.model('Stufile',StufileSchema);

module.exports=Stufile;