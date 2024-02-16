const express=require('express')

const router=express.Router()

const {getBookByCategory,getCollectionAndWishlist}=require('../controllers/home')

router.route('/').get(getCollectionAndWishlist)
router.route('/:category').get(getBookByCategory)

module.exports=router