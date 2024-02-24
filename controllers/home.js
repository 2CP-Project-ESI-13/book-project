const { query } = require('express')
const Book=require('../models/book')
const User=require('../models/user')


const book_api=require('../middlewares/books_api')




const getCollection = async (req, res) => {
    try {
        //we got the image link in the book, schema
        const user = await User.findOne({ _id: req.headers.value });
        const isbn_list = user.collection_list;
        const books_list = await Promise.all(isbn_list.map(async (isbn) => {
            const book=await Book.findOne({isbn},{name:1,author:1,image:1})

            return book;
        }));

        res.json(books_list);
    } catch (error) {
        console.error('Error getting collection:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




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
    getCollection,
    getCollectionAndWishlist,
    //postBook,
    getBookByCategory,
}