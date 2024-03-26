const { query } = require("express");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const book_api = require("../middlewares/books_api");
const book_categories = require("../middlewares/categories_api")


const getBookCollection = async (req, res) => {
  try {
    //we got the image link in the book, schema
    const user = await User.findOne({ _id: req.body._id });
    const isbn_list = user.collection_list;
    const books_list = await Promise.all(
      isbn_list.map(async (isbn) => {
        const book = await Book.findOne(
          { isbn },
          { name: 1, author: 1, image: 1 }
        );
        return book;
      })
    );
    res.json(books_list).status(200);
  } catch (error) {
    console.error("Error getting collection:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// middleware that returns the wishlist of the logged in user
const getWishlist = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findOne({ _id: req.body._id });
    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the list of ISBNs from the user's wishlist
    const isbnList = user.wishlist;

    // Fetch books corresponding to each ISBN in the wishlist
    const booksList = await Promise.all(
      isbnList.map(async (isbn) => {
        const book = await Book.findOne(
          { isbn },
          { name: 1, author: 1, image: 1 });
        return book;
      })
    );

    // Send the list of books as the response
    res.json(booksList).status(200);
  } catch (error) {
    // Handle errors
    console.error("Error getting wishlist books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getBookCollectionAndWishlist = async (req, res) => {};

const getBookByCategory = async (req, res) => {
  //pass the category in the req.body
};

const getBook=async (req,res)=>{
     const bookId=req.params.id
     const book=await Book.findOne({_id:bookId})
     res.status(200).json(book)

 }

//Book recommendations function:
const getRecommendations = async () => {
  try {
    const user = new Book().findOne({ username: req.headers.username });
    //get the prefered categories of the user
    const categories = user.categories;
    // Fetch books that belong to preferred categories
    const books = await Book.find({ categories: { $in: categories } }).limit(
      10
    );

    // Calculate similarity scores and sort recommendations
    const recommendations = books
      .map((book) => ({
        book,
        similarityScore: calculateSimilarity(book.categories, categories),
      }))
      .sort((a, b) => b.similarityScore - a.similarityScore);

    return recommendations.map((recommendation) => recommendation.book);
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw new Error("Internal server error");
  }
};
//helper function to calculate similarity between books and user preferences
const calculateSimilarity = (categoriesA, categoriesB) => {
  const intersection = categoriesA.filter((category) =>
    categoriesB.includes(category)
  );
  const union = [...new Set([...categoriesA, ...categoriesB])];
  return intersection.length / union.length;
};

// function to add a new rating to the specified book

const addRating = async (req, res) => {
  try {
    // Decompose the request into the fields we need
    const { username, isbn, rating, comment } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const book = await Book.findOne({ isbn });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    // Append the new rating to the 'ratings' field in the book
    await Book.updateOne({ isbn }, { $push: { ratings: { rating, comment } } });
    res.status(200).json({ message: "Rating added successfully!" });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//___________________________________________updating user book infos___________________________________________________//

/* const addToWishlist = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { isbn } = req.body;
    if (!isbn) {
      return res.status(400).json({ message: "ISBN is required" });
    }
    if (user.wishlist.includes(isbn)) {
      return res
        .status(400)
        .json({ message: "ISBN is already in the wishlist" });
    }
    user.wishlist.push(isbn);
    await user.save();
    res.status(200).json({ message: "Element added to wishlist successfully" });
  } catch (error) {
    console.error("Error adding element to wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addToCollection = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { isbn } = req.body;
    if (!isbn) {
      return res.status(400).json({ message: "ISBN is required" });
    }
    if (user.collection_list.includes(isbn)) {
      return res
        .status(400)
        .json({ message: "ISBN is already in the collection" });
    }
    user.collection_list.push(isbn);
    await user.save();
    res
      .status(200)
      .json({ message: "Element added to collection successfully" });
  } catch (error) {
    console.error("Error adding element to collection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}; */

//delete elements
const removeFromCollection = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { collection_list: req.body.isbn } },
      { new: true } // To return the updated document
    );
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "ISBN not found in collection" });
    }
    res
      .status(200)
      .json({ message: "Element removed from collection successfully" });
  } catch (error) {
    console.error("Error removing element from collection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { wishlist: req.body.isbn } },
      { new: true } // To return the updated document
    );
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "ISBN not found in wishlist" });
    }
    res
      .status(200)
      .json({ message: "Element removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing element from wishlist:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const postBookInCollection = async (req, res) => {
  try {
    //get user
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isbn  = req.body.isbn;
    user.collection_list.push(isbn);
    user.save();


    const book = await Book.findOne({ isbn });
    if (!book) {
      //get metadata
      const responseData = await book_api(isbn);
      const { title, authors, imageLinks } = responseData.items[0].volumeInfo;
      const image = imageLinks.thumbnail;
      const author = authors[0];
      const categories = await book_categories(isbn);
      const book = {
        isbn,
        title,
        author,
        image,
        owners: [user._id],
        categories,
      };
      //create book in the database
      await Book.create(book);
    } else {
      //add the owner
      book.owners.push(user._id);
    }

    return res.json("book added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const postBookInWishlist = async (req, res) => {
  try {
    //get user
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isbn  = req.body.isbn;
    user.wishlist.push(isbn);
    user.save();


    const book = await Book.findOne({ isbn });
    if (!book) {
      //get metadata
      const responseData = await book_api(isbn);
      console.log(responseData);
      console.log("----------------------------------------------");
      const { title, authors, imageLinks } = responseData.items[0].volumeInfo;
      const image = imageLinks.thumbnail;
      const author = authors[0];
      const categories = await book_categories(isbn);
      const book = {
        isbn,
        title,
        author,
        image,
        owners: [user._id],
        categories,
      };
      //create book in the database
      await Book.create(book);
    } else {
      //add the owner
      book.owners.push(user._id);
    }

    return res.json("book added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//_________________________________________________________________________________________________________________
module.exports = {
  getBookCollection,
  getBookCollectionAndWishlist,
  postBookInCollection,
  postBookInWishlist,
  getBookByCategory,
  getWishlist,
  getRecommendations,
  addRating,
  getBook,
  removeFromCollection,
  removeFromWishlist,
};
