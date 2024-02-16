const { query } = require('express')
const Book=require('../models/book')
const User=require('../models/user')


const getCollectionAndWishlist =async (req,res)=>{

}


// const getWishlist =async (req,res)=>{
// }



const getBookByCategory=async (req,res)=>{
    //pass the category in the req.body
}


// const getBook=async (req,res)=>{
//     const bookId=req.params.id
//     const book=await Book.findOne({_id:bookId})
//     res.status(200).json(book)

// }



module.exports={
    getCollectionAndWishlist,
    //postBook,
    getBookByCategory,
}