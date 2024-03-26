const mongoose=require('mongoose')

const BookSchema=new mongoose.Schema({

    isbn:{
        type:String,
        required:[true,'provide the books name']
    }
    ,

    name:{
        type:String,

    },
    image:{
        type:String,

    },
    author:{
        type:String,

    },

    language:{
        type:String,
    },

    description:{
        type:String,
    },

    categories:{
    type:[String],
    },
    // quantity_exchange:{
    //     type:Number,
    // },
    // quantity_bib:{
    //     type:Number,
    //     required:[true,'provide the quantity']
    // },
    owners:{
        type:[mongoose.Types.ObjectId],
        required:[true,'no user'],
        ref:'USER'
    }
})

module.exports=mongoose.model('book',BookSchema)