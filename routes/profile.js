const express=require('express')

const router=express.Router()

const {postBookInCollection}=require("../controllers/profile")

router.route("/post").post(postBookInCollection)


module.exports=router