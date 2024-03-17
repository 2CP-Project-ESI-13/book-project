const express=require('express')

const router=express.Router()

const {getBookByCategory,getCollectionAndWishlist,getCollection, getWishlist, getRecommendations}=require('../controllers/home.controller')

router.route('/').get(getCollection)//getCollectionAndWishlist
router.route('/:categories').get(getBookByCategory)
router.route('/:wishlist').get(getWishlist)
router.route('/:recommendations').get(getRecommendations)

module.exports=router
