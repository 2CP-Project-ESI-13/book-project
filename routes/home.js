const express = require("express");

const router = express.Router();

const {
  getBookByCategory,
  getCollectionAndWishlist,
  getBookCollection,
  getWishlist,
  getRecommendations,
  removeFromCollection,
  removeFromWishlist,
  postBookInCollection,
  postBookInWishlist,
} = require("../controllers/home.controller");

router.route("/collection").get(getBookCollection); //getCollectionAndWishlist
//router.route("/:categories").get(getBookByCategory);
router.route("/").get(getWishlist);
router.route("/recommendations").get(getRecommendations);
router.route("/addToWishlist").post(postBookInWishlist);
router.route("/addToCollection").post(postBookInCollection);
router.route("/removefromwishlist").post(removeFromWishlist);
router.route("/removeFromCollection").get(removeFromCollection);
router.route("/postBookInCollection").post(postBookInCollection);

module.exports = router;
