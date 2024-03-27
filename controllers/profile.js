const User=require("../models/user")
const Book=require("../models/book");
const book_categories = require("../middlewares/categories_api");
const book_api=require("../middlewares/books_api")



const postBookInCollection=async (req,res)=>{
    try {
        //get user
        const user = await User.findOne({ _id: req.body._id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });}

        const {isbn}=req.body
        user.ownedbooks.push(isbn)
        user.save()


        const book =await Book.findOne({isbn});
        if (!book){
            //get metadata
            
            const responseData = await book_api(isbn);
            const { title, authors, imageLinks } = responseData.items[0].volumeInfo;
            const image=imageLinks.thumbnail;
            const author=authors[0]
            const categories=await book_categories(isbn)
            const book = { isbn,title, author, image,owners:[user._id],categories };


            
            //create book in the database
            await Book.create(book)

        }
        else{
            //add the owner 
            book.owners.push(user._id)
            
        }

        



        return res.json('book added')

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
        

    }

const postBookInWishlist=async (req,res)=>{
    try {
        //get user
        const user = await User.findOne({ _id: req.body._id });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });}

        const {isbn}=req.body
        user.wishlist.push(isbn)
        user.save()
        



        return res.json('book added')

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
        

    
    }

//can sum up those two in one


module.exports={
    postBookInCollection,
    postBookInWishlist
}