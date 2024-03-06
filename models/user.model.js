const mongoose=require('mongoose')

require('dotenv').config()


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please enter a valid username"]
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

    offers_a_id:{type:[mongoose.Types.ObjectId]},

    offers_b_id:{type:[mongoose.Types.ObjectId]},
    photo: {
        type: String,
        default: "https://i.seadn.io/gcs/files/3085b3fc65f00b28699b43efb4434eec.png?auto=format&dpr=1&w=1000",
        
    }

}, { timestamps: true })


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

module.exports=mongoose.model('userTest',UserSchema)