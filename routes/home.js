const express=require('express')

const router=express.Router()

const {getBookByCategory,getCollectionAndWishlist,getCollection}=require('../controllers/home.controller')

router.route('/').get(getCollection)//getCollectionAndWishlist
router.route('/:category').get(getBookByCategory)

module.exports=router
