const Class=require('../models/class.js')
const Link=require('../models/Link.js')

const getlink=async (classname)=>{
    try {
        const objdata=await Link.findOne({"classname":classname});

        //console.log(objdata)

        if(objdata!==null){

            return objdata.data;

        }
    } catch (error) {
        
    }
    
}


const getdatedata=async (username)=>{
    
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
            const data=await getlink(arrmod[i])

            

                //console.log(data)
                for(let j in data){
                        //console.log(j,data[j])


                        const tempc={
                            "classname":arrmod[i],
                            "link":data[j].link,
                            "date":data[j].date                
                        }
                        arrfin.push(tempc)
        
                }
                  
        }
        
        //console.log(arrfin)
        return arrfin;


    } catch (error) {
        
    }

}


module.exports=getdatedata;