const express=require('express')

const router=express.Router()

const {postBookInCollection, postBookInWishlist}=require("../controllers/profile")

router.route("/post").post(postBookInCollection)
router.route("/postInWishList").post(postBookInWishlist)


module.exports=router