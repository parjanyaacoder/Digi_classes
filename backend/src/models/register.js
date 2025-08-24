const mongoose=require('mongoose');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

//console.log(process.env.SECRET_KEY);

// console.log("here in register")

const RegisterSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    password:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
     
});



RegisterSchema.methods.generateAuthToken=async function(){
    try {
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
        // console.log(token);     
            this.tokens=this.tokens.concat({token:token});

        return token;

    } catch (error) {
        
        console.log(error);
        res.status(500).send('Registration Failed !-- Try Again');

        
    }
};


RegisterSchema.pre('save',async function(next){
    //console.log(`Current password is ${this.password}`);
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);

    }
    next();
    })

const Register=new mongoose.model('Register',RegisterSchema);

module.exports=Register;