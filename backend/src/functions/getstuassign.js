
const Assignment=require('../models/Assignment.js')



const getstuassign=async (username,classname)=>{
    
    try {
        

        const objdata=await Assignment.findOne({"username":username,"classname":classname});

        
        const arr=objdata.upload;

        arrfin=[]

        for(let i in arr){
                const arrmod=arr[i].submission;
                for(let j in arrmod){
                        //console.log(j,data[j])


                        const tempc={
                            "value":arrmod[j].announce,
                            "dateuploaded":arrmod[j].Date,
                            "username":arrmod[j].username,
                            "file":arrmod[j].file,
                            "title":arr[i].title
                           
                            
                        }
                        arrfin.push(tempc)
        
                }
                  
        }
        
        //console.log(arrfin)
        return arrfin;


    } catch (error) {
        
    }

}


module.exports=getstuassign;