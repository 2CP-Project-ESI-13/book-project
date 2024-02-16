const mongoose=require('mongoose')

const OfferSchema=new mongoose.Schema({

    user_a:{
        type:mongoose.Types.ObjectId,
        required:[true,'provide the user a']
    }
    ,

    user_b:{
        type:mongoose.Types.ObjectId,
        required:[true,'provide the user b']
    },

    isbn_a:{
        type:String,
        required:[true,'provide the book a isbn']
    },

    isbn_b:{
        type:[String],
        required:[true,'provide the books b isbn']
    },
    status:{
        type:String
    }

})

module.exports=mongoose.model('offer',OfferSchema)