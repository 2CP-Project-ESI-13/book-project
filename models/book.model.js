const mongoose=require('mongoose')

const BookSchema=new mongoose.Schema({

    isbn:{
        type:String,
        required:[true,'provide the books name']
    }
    ,

    name:{
        type:String,
        required:[true,'provide the books name']
    },
    image:{
        type:String,
        required:[true,'provide the books name']
    },
    author:{
        type:String,
        required:[true,'provide the books name']
    },

    language:{
        type:String,
        required:[true,'provide the books name']
    },

    description:{
        type:String,
        required:[true,'provide the book description']
    },

    categories:{
    type:[String],
        required:[true,'provide the books category']
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