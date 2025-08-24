const mongoose=require('mongoose');

const InsfileSchema=new mongoose.Schema({
 file:{
        type:Object,
        required:true,
    }   
});

const Insfile=new mongoose.model('Insfile',InsfileSchema);

module.exports=Insfile;