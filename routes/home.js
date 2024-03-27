const express=require('express')

const router=express.Router()

const {getBookByCategory,getWishlist,getCollection}=require('../controllers/home')

router.route('/getCollection/:id').get(getCollection)
router.route('/getWishlist/:id').get(getWishlist)
router.route('/:category').get(getBookByCategory)

module.exports=router
