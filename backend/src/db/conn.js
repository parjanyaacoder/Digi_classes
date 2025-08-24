const mongoose=require("mongoose");

// urilocal="mongodb://localhost:27017/login_test";

console.log(process.env.DATABASE)

mongoose.connect(process.env.DATABASE,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true
})
.then(()=>{
    console.log("Connection to database successfull !");
})
.catch((err)=>{
    console.log(err);
})