const Insfile=require("../models/Insfile.js");
const getfiledata=async (body)=>{
    try {

        const objdata=await Insfile.findOne({"_id":body.fileid});

        if(objdata!==null){
            return objdata.file;
        }
        
    } catch (error) {
        
    }

    

}

module.exports=getfiledata;