const Class=require('../models/class.js')


const getclassimage=async (classname)=>{
    try {
        const objdata=await Class.findOne({"classowned.classname":classname});

        if(objdata!==null){
            
            const temp=objdata.classowned.map((elem)=>{
                if(elem.classname===classname){
                    return elem.classimage
                }
                else{
                    return null
                }
            })

            

            tempfinalsend=temp.filter((elem,index)=>{
                if(elem===null){
                    return false
                }else{
                    return true
                }
            })
            //console.log(tempfinalsend)
            return [tempfinalsend[0],objdata.username]

        }
    } catch (error) {
        
    }
    
}


const getdata=async (username)=>{
    
    try {

        const objdata=await Class.findOne({"username":username});

        
        const arr=objdata.classjoined;

        const arrmod=arr.map((elem,index)=>{
            return elem.classname
        })


        arrfin=[]

        for(let i in arrmod){
            const data=await getclassimage(arrmod[i])
            const tempc={
                "uniqueNo":arrmod[i],
                "imageUrl":data[0],
                "name":arrmod[i],
                "role":data[1],
                "back":data[0]
            }
            arrfin.push(tempc)
        }
        
        //console.log(arrfin)
        return arrfin;


    } catch (error) {
        
    }

}


module.exports=getdata;