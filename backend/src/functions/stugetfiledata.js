const Stufile=require("../models/Stufile.js");
const stugetfiledata=async (body)=>{
    try {

        //console.log(body)
        const objdata=await Stufile.findOne({"_id":body.fileid,"announce":body.announce});

        if(objdata!==null){
            return objdata.file;
        }
        
    } catch (error) {
        
    }

    

}

module.exports=stugetfiledata;