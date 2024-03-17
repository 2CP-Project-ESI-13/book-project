const { query } = require("express");
const Book = require("../models/book.model");
const User = require("../models/user.model");

const book_api = require("../middlewares/books_api");

const getBookCollection = async (req, res) => {
  try {
    //we got the image link in the book, schema
    const user = await User.findOne({ _id: req.headers.value });
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
    //get the user
    const user = new Book().findOne({ username: req.headers.username });
    //get the wishlist
    const wishlist = user.wishList;
    // it returns a list of ISBNs as the wishlist books
    if (!wishlist) {
      res.status(404).json({ message: "wishlist not found!" });
    }
    //transforming the list of ISBNs into a list of books:
    const books_list = await Promise.all(
      wishlist.map(async (isbn) => {
        const book = await Book.findOne(
          { isbn },
          { name: 1, author: 1, image: 1 }
        );

        return book;
      })
    );

    res.json(books_list).status(200);
  } catch (error) {
    // If any error occurs during the process
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getBookCollectionAndWishlist = async (req, res) => {};

const getBookByCategory = async (req, res) => {
  //pass the category in the req.body
};

// const getBook=async (req,res)=>{
//     const bookId=req.params.id
//     const book=await Book.findOne({_id:bookId})
//     res.status(200).json(book)

// }

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

module.exports = {
  getBookCollection,
  getBookCollectionAndWishlist,
  //postBook,
  getBookByCategory,
  getWishlist,
  getRecommendations,
  addRating,
};
