const Class=require('../models/class.js')


const getallclassname=async (username)=>{
    
    try {

        const objdata=await Class.findOne({"username":username});
 
        const arr=objdata.classowned;

        const arrmod=arr.map((elem,index)=>{
            return elem.classname
        })

        return arrmod;


    } catch (error) {
        
    }

}


module.exports=getallclassname;