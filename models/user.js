const mongoose=require('mongoose')
// const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')
require('dotenv').config()


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a valid name"]
    },
    email:{
        type:String,
        required:[true,"please enter a valid email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,'please enter a valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter a valid password"],
        minlength:6

    },
    collection_list:{type:[String]},//list of isbn

    wishlist:{type:[String]},//list of isbn

    //bibs_id:{type:[mongoose.Types.ObjectId]},

    offers_a_id:{type:[mongoose.Types.ObjectId]}, //ykon houwa mol lktab

    offers_b_id:{type:[mongoose.Types.ObjectId]},//ykon houwa talab lktab


})


// UserSchema.pre('save',async function(next){
// const salt=await bcrypt.genSalt(10)
// this.password=await bcrypt.hash(this.password,salt)
// next()
// })


// UserSchema.methods.createToken=function(){
//     return jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
// }

// UserSchema.methods.comparePasswords=async function(password){
//     return await bcrypt.compare(password,this.password)
// }

module.exports=mongoose.model('user',UserSchema)