const mongoose=require('mongoose')
// const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')
require('dotenv').config()



const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type:String,required:true},
    phone:{type:String,required:true,unique: true},
    categories: {type: [String], required:true},
    verified: {type: Boolean, required:true},
    verifyLink:{type:String,unique:true},
    ownedbooks: {type :[String]}, //list of isbn
    cart:{type:[String]},                //ancient wishlist , list of isbn same for wishlist
    wishlist:{type:[String]},
    offers_a:{type:[mongoose.Types.ObjectId]}, //see offers models
    offers_b:{type:[mongoose.Types.ObjectId]},
    photo:{type:String,default:"https://i.seadn.io/gcs/files/3085b3fc65f00b28699b43efb4434eec.png?auto=format&dpr=1&w=1000"},
    resetPasswordToken:{type:String},
    resetPasswordExpires:{type:String}
  });

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