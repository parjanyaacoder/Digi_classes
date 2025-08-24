const Class=require('../models/class.js')
const Assignment=require('../models/Assignment.js')

const getclassass=async (classname)=>{
    try {
        const objdata=await Assignment.findOne({"classname":classname});

        //console.log(objdata)

        if(objdata!==null){

            return objdata.upload;

        }
    } catch (error) {
        
    }
    
}


const getdata=async (username)=>{
    
    try {
        

        const objdata=await Class.findOne({"username":username});

        
        const arr=objdata.classjoined;

        //console.log(arr)

        const arrmod=arr.map((elem,index)=>{
            return elem.classname
        })

        //console.log(arrmod)

        arrfin=[]

        for(let i in arrmod){
            const data=await getclassass(arrmod[i])

            

                //console.log(data)
                for(let j in data){
                        //console.log(j,data[j])


                        const tempc={
                            "uniqueNo":data[j]._id,
                            "date":data[j].due,
                            "header":arrmod[i],
                            "value":data[j].announce,
                            "dateuploaded":data[j].Date,
                            "title":data[j].title,
                            "file":data[j].file
                           
                            
                        }
                        arrfin.push(tempc)
        
                }
                  
        }
        
        //console.log(arrfin)
        return arrfin;


    } catch (error) {
        
    }

}


module.exports=getdata;